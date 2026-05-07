import { type FormEvent, type ReactNode, useState } from 'react'

import {
  ChevronRight,
  FileText,
  Folder,
  Home,
  Maximize2,
  Minimize,
  Package,
  Search,
  Square,
  X,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

const menuGroups = [
  {
    label: 'Warehouse',
    items: [
      'Bin Management',
      'Bin Management',
      'Compliance Tools',
      'Control Dashboard',
      'Disposed Box Management',
      'Disposal Shipment',
      'Home',
      'Product Management',
      'Quality Assurance',
      'UPS Export',
      'VLM Mgmt',
    ],
  },
  {
    label: 'CRM',
    items: [
      'Confirm Update',
      'Customer Service Tools',
      'Home',
      'MedPaks',
      'Sales Campaign',
      'Supply Chain',
      'Territory Manager',
      'UPS Export',
    ],
  },
  {
    label: 'Finance',
    items: ['Batch Credit module', 'Batch Research', 'Dashboard', 'NonBatch Research'],
  },
  {
    label: 'IT Tools',
    items: ['Management Dashboard', 'Management Reports'],
  },
  {
    label: 'Processing',
    items: [
      'Batch Closing',
      'Carrier Returns',
      'CTAG Returns',
      'Editing Tool',
      'Human CTAG Returns',
      'MedPaks',
      'Putwall',
      'Reports',
      'Return Totes',
      'Returns',
      'Setup Dashboard',
      'Supply Chain',
      'Time Tracking Tool',
    ],
  },
  {
    label: 'Shipping/Receiving',
    items: ['Import UPS Receiving', 'Pick List Queue', 'Receiving', 'Receiving Management', 'Returns/Product Tools'],
  },
]

const emptyDetailRows = [
  ['Pharm Address', ''],
  ['DEA Number', ''],
  ['DEA Exp', ''],
  ['ST License', ''],
  ['Sales Emp', ''],
]

const populatedDetailRows = [
  ['Pharm Address', '1256 Bryan Dairy Rd Suite 200, Largo, FL 33777'],
  ['DEA Number', 'AB0777899'],
  ['DEA Exp', '04/30/2027'],
  ['ST License', '034082'],
  ['Sales Emp', 'Amerson Orton'],
]

const emptyWholesaleRows = ['Name', 'Address', 'Account', 'HRSA', 'Part. Name']

const populatedWholesaleRows = [
  ['Name', 'Amerisource Corporation'],
  ['Address', '10910 Lee Vista Blvd Suite 401'],
  ['', 'Orlando, FL 32829'],
  ['Account', '10049719'],
  ['HRSA', ''],
  ['Part. Name', ''],
]

const debitMemoItems = [
  'MCKC12A',
  'GW043082C2',
  'IT01223ARC',
  'IT01236A',
  'MCK0034',
  'SKT22355A',
]

const returnItemHeaders = [
  'ID',
  'NDC',
  'Description',
  'Control',
  'Quantity',
  'PartialPackage',
  'Price',
  'Amount',
  'Returnable',
  'ExpireDt',
  'SerialNum',
  'LotNo',
  'Strength',
]

function TreeItem({
  label,
  icon = 'file',
  selected = false,
  onSelect,
}: {
  label: string
  icon?: 'folder' | 'home' | 'file'
  selected?: boolean
  onSelect?: () => void
}) {
  const Icon = icon === 'folder' ? Folder : icon === 'home' ? Home : FileText
  const Comp = onSelect ? 'button' : 'div'

  return (
    <Comp
      type={onSelect ? 'button' : undefined}
      onClick={onSelect}
      className={`flex h-4 items-center gap-1 whitespace-nowrap text-[11px] leading-none ${
        selected ? 'bg-blue-600 text-white' : 'text-slate-700'
      } ${onSelect ? 'w-full cursor-pointer text-left' : ''}`}
    >
      <ChevronRight className="size-2.5 text-slate-400" aria-hidden="true" />
      <Icon className={`size-3 ${selected ? 'text-white' : 'text-sky-600'}`} aria-hidden="true" />
      <span>{label}</span>
    </Comp>
  )
}

function FieldRow({
  label,
  value,
  trailing,
  editable = false,
}: {
  label: string
  value?: string
  trailing?: ReactNode
  editable?: boolean
}) {
  return (
    <div className="grid grid-cols-[76px_1fr] items-center gap-1 text-[11px] leading-none">
      <span className="text-right text-slate-700">{label}:</span>
      <div className="flex min-w-0 items-center gap-1">
        {editable ? (
          <input
            defaultValue={value}
            aria-label={label}
            className="h-4 min-w-0 flex-1 border border-slate-200 bg-white/70 px-1 text-slate-600 shadow-inner outline-none focus:border-sky-400"
          />
        ) : (
          <div className="h-4 min-w-0 flex-1 rounded-sm border border-transparent bg-white/40 px-1 text-slate-500">
            {value}
          </div>
        )}
        {trailing}
      </div>
    </div>
  )
}

function LegacyButton({
  children,
  disabled = false,
  className = '',
}: {
  children: string
  disabled?: boolean
  className?: string
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`h-5 whitespace-nowrap rounded-sm border border-slate-300 bg-gradient-to-b from-white to-slate-200 px-3 text-[10px] leading-none text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] disabled:cursor-not-allowed disabled:opacity-35 ${className}`}
    >
      {children}
    </button>
  )
}

export function CustomerDetailsSearchScreen() {
  const [searchText, setSearchText] = useState('')
  const [hasSearchResult, setHasSearchResult] = useState(false)
  const detailRows = hasSearchResult ? populatedDetailRows : emptyDetailRows
  const wholesaleRows = hasSearchResult ? populatedWholesaleRows : emptyWholesaleRows.map((row) => [row, ''])

  function handleFind(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (searchText.trim().length > 0) {
      setHasSearchResult(true)
    }
  }

  return (
    <main className="h-screen overflow-hidden bg-slate-100 text-slate-900">
      <section className="flex h-full w-full flex-col overflow-hidden bg-slate-100">
        <div className="flex h-5 items-center justify-between bg-gradient-to-b from-slate-50 to-slate-200 px-2 text-[10px] text-slate-500">
          <span>Prophet</span>
          <div className="flex items-center gap-4">
            <Minimize className="size-3" aria-hidden="true" />
            <Maximize2 className="size-3" aria-hidden="true" />
            <X className="size-3" aria-hidden="true" />
          </div>
        </div>

        <div className="bg-gradient-to-b from-zinc-800 via-zinc-700 to-zinc-950 px-2 py-1 text-sm font-semibold text-white shadow-inner">
          Prophet Version 2.5.2.4
        </div>

        <div className="bg-gradient-to-b from-zinc-900 to-zinc-700 px-1 py-0.5 text-[11px] text-white">
          Menu
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[255px_1fr] border-t border-zinc-500">
          <aside className="min-h-0 overflow-hidden border-r border-slate-400 bg-slate-50">
            <div className="flex h-full">
              <div className="w-5 border-r border-slate-200 bg-slate-100" />
              <div className="min-w-0 flex-1 overflow-hidden px-1 py-1">
                {menuGroups.map((group) => (
                  <div key={group.label} className="mb-1">
                    <TreeItem label={group.label} icon="folder" />
                    <div className="ml-4 border-l border-slate-200 pl-1">
                      {group.items.map((item, index) => (
                        <TreeItem
                          key={`${group.label}-${item}-${index}`}
                          label={item}
                          icon={item === 'Home' ? 'home' : 'file'}
                          selected={hasSearchResult && group.label === 'Processing' && item === 'Returns'}
                          onSelect={
                            group.label === 'Processing' && item === 'Returns'
                              ? () => {
                                  setSearchText('')
                                  setHasSearchResult(false)
                                }
                              : undefined
                          }
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <section className="relative min-h-0 overflow-hidden bg-[#f2f2f2]">
            <div className="border-b border-slate-400 bg-gradient-to-b from-slate-100 to-slate-200 px-2 py-1 text-[11px] font-medium">
              Customer Details
            </div>

            <div className="grid grid-cols-[minmax(170px,1fr)_minmax(215px,1.3fr)_minmax(120px,0.75fr)_minmax(185px,1fr)] items-start gap-3 p-3">
              <div className="min-w-0 space-y-2 text-[11px]">
                <div className="grid grid-cols-[90px_1fr] items-start gap-x-2 gap-y-1">
                  {hasSearchResult && (
                    <div className="col-span-2 min-w-0 truncate font-semibold text-slate-900">
                      Test Pharmacy Test
                    </div>
                  )}
                  <div>
                    <a className="font-semibold text-indigo-700 underline" href="#pharmacy">
                      Pharmacy
                    </a>
                    {hasSearchResult && <span className="ml-2 font-semibold text-slate-900">1</span>}
                  </div>
                  <div className="text-lg font-semibold leading-none text-indigo-800">
                    COT: <span className="ml-2">Retail</span>
                  </div>
                </div>

                <div className="space-y-1">
                  {detailRows.map(([label, value]) => (
                    <FieldRow
                      key={label}
                      label={label}
                      value={value}
                      trailing={
                        hasSearchResult && label === 'Sales Emp' ? (
                          <LegacyButton>ICT</LegacyButton>
                        ) : undefined
                      }
                    />
                  ))}
                </div>

                <div className="pt-1 font-semibold">Wholesale</div>
                <div className="space-y-1">
                  {wholesaleRows.map(([label, value], index) => (
                    <FieldRow
                      key={`${label}-${index}`}
                      label={label}
                      value={value}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-x-3 gap-y-1 pt-2 text-[10px] text-slate-500">
                  {['Non-Batch', 'EcoLink', '340B', 'GPO'].map((item) => (
                    <label key={item} className="flex items-center gap-1">
                      <Square className="size-3 text-slate-300" aria-hidden="true" />
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              <div className="min-w-0 space-y-2">
                <div className="text-center text-[11px] font-medium">Shipping</div>
                <div className="h-32 border border-slate-500 bg-slate-400">
                  <div className="grid grid-cols-2 border-b border-slate-500 bg-white text-[11px]">
                    <div className="border-r border-slate-300 px-2">ShipItem</div>
                    <div className="px-2">Tampered</div>
                  </div>
                  {hasSearchResult && (
                    <div className="grid grid-cols-2 bg-sky-600 text-[11px] text-white">
                      <div className="border-r border-sky-500 px-2">2-Red-03/26/2024</div>
                      <div className="grid place-items-center px-2">
                        <input
                          type="checkbox"
                          aria-label="Tampered"
                          className="size-3 accent-sky-700"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
                  <span className="font-semibold">Notes/Instructions:</span>
                  <span className="text-base font-semibold text-amber-600">Batch Customer</span>
                </div>
                <Input
                  aria-label="Notes or instructions"
                  className="h-5 rounded-none border-slate-300 bg-white text-[11px] shadow-inner"
                />
              </div>

              <div className="min-w-0 space-y-2 text-[11px]">
                <div className="font-semibold">Stats</div>
                <div className="flex justify-between">
                  <LegacyButton>Tote Trans</LegacyButton>
                  <a href="#return-totes" className="font-semibold text-indigo-700 underline">
                    Return Totes
                  </a>
                </div>
                <FieldRow
                  label="Return Count"
                  value="0"
                  trailing={hasSearchResult ? <LegacyButton>Help</LegacyButton> : undefined}
                />
                <FieldRow label="Scan Count" value="0" />
                <a href="#refresh" className="block text-right font-semibold text-indigo-700 underline">
                  Refresh
                </a>
                <Separator />
                <FieldRow label="Return Value" editable />
                <FieldRow label="Sales Order" editable />
                <FieldRow label="Rate" editable />
                <div className="pt-5 text-center text-red-700">
                  {hasSearchResult ? (
                    <div className="inline-flex items-center justify-center gap-1.5 rounded-sm px-2 py-1 text-slate-700">
                      <span className="grid size-5 place-items-center rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 text-[9px] font-bold text-white">
                        Rx
                      </span>
                      <span className="text-[10px] font-bold tracking-tight text-slate-600">
                        NovaPharm
                      </span>
                    </div>
                  ) : (
                    '□'
                  )}
                </div>
              </div>

              <div className="h-32 min-w-0 self-start rounded-sm border border-slate-200 bg-white/50 p-3 text-center text-[11px]">
                <div className="mb-3 text-left font-semibold leading-tight">
                  Kirby Lester Pill Counter Log
                </div>
                <label className="block text-slate-600">Serial Number</label>
                <Input className="mx-auto mt-2 h-5 w-full max-w-36 rounded-none border-slate-300 bg-white" />
              </div>
            </div>

            <div className="grid grid-cols-[160px_minmax(0,1fr)] gap-3 px-3">
              <div className="space-y-2">
                <div className="rounded-sm border border-slate-300 bg-white/40 p-2 text-[11px]">
                  <div className="mb-1 font-medium">Debit Memo</div>
                  <LegacyButton disabled className="w-full">Stop Timer</LegacyButton>
                  <div className="mt-2 flex flex-col items-stretch gap-2">
                    <LegacyButton>Tracking Info</LegacyButton>
                    <LegacyButton>Load Return Items</LegacyButton>
                  </div>
                  <div className="mt-2 h-16 overflow-hidden rounded-sm border border-slate-300 bg-white">
                    {hasSearchResult &&
                      debitMemoItems.map((item, index) => (
                        <div
                          key={item}
                          className={`px-1 text-[10px] leading-3 ${
                            index === 0 ? 'bg-sky-600 text-white' : 'text-slate-700'
                          }`}
                        >
                          {item}
                        </div>
                      ))}
                  </div>
                  <div className="mt-3 flex flex-col items-stretch gap-2">
                    <LegacyButton>NEW DebitMemo</LegacyButton>
                    <LegacyButton disabled>NEW C2 DebitMemo</LegacyButton>
                  </div>
                  <div className="mt-2 text-center">
                    <LegacyButton className="w-full">Generate Tally</LegacyButton>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[10px]">
                  <span
                    aria-label="status indicator"
                    className="size-3 rounded-full border border-slate-400 bg-slate-300"
                  />
                  <span
                    aria-label="status indicator"
                    className="size-3 rounded-full border border-slate-400 bg-slate-300"
                  />
                  <LegacyButton>Add/Edit Note</LegacyButton>
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-48 overflow-x-auto overflow-y-hidden border-2 border-slate-500 bg-slate-400">
                  {hasSearchResult && (
                    <div className="min-w-[860px]">
                      <div className="grid grid-cols-[42px_70px_130px_64px_72px_110px_64px_72px_90px_78px_88px_66px_74px] border-b border-slate-400 bg-white text-[10px]">
                        {returnItemHeaders.map((header) => (
                          <div key={header} className="truncate border-r border-slate-300 px-2 leading-4">
                            {header}
                          </div>
                        ))}
                      </div>
                      <div className="h-36 bg-slate-400" />
                      <div className="h-3 border-t border-slate-300 bg-white">
                        <div className="ml-3 mt-1 h-1 w-2/3 rounded-full bg-slate-400" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <LegacyButton>Import</LegacyButton>
                  <LegacyButton>Web Inv</LegacyButton>
                  <LegacyButton disabled={!hasSearchResult}>Add Prescription</LegacyButton>
                  <LegacyButton>Past Pres.</LegacyButton>
                  <LegacyButton>Print Report</LegacyButton>
                  <LegacyButton disabled={!hasSearchResult}>Add</LegacyButton>
                  <LegacyButton disabled={!hasSearchResult}>Edit</LegacyButton>
                  <LegacyButton disabled={!hasSearchResult}>Delete</LegacyButton>
                  <div className="ml-auto">
                    <LegacyButton>Do Not Use</LegacyButton>
                  </div>
                </div>
              </div>
            </div>

            {!hasSearchResult && (
              <>
                <div className="absolute inset-0 bg-slate-200/25" aria-hidden="true" />

                <div className="absolute left-1/2 top-[255px] w-[300px] -translate-x-1/2 overflow-hidden rounded-lg border border-slate-400 bg-slate-100 shadow-2xl">
                  <div className="flex h-6 items-center justify-between bg-slate-50 px-2 text-[11px]">
                    <div className="flex items-center gap-1">
                      <Package className="size-3 text-amber-500" aria-hidden="true" />
                      <span>PharmaLink Inc. | Prophet</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-500">
                      <Minimize className="size-3" aria-hidden="true" />
                      <Maximize2 className="size-3" aria-hidden="true" />
                      <X className="size-3" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-b from-zinc-700 to-zinc-950 px-2 py-1 text-[11px] font-semibold text-white">
                    Pharmacy Search
                  </div>
                  <form onSubmit={handleFind} className="space-y-3 p-5 text-[11px]">
                    <div className="grid grid-cols-[70px_1fr] items-center gap-2">
                      <label htmlFor="search-by" className="font-medium">
                        Search By:
                      </label>
                      <div className="relative">
                        <select
                          id="search-by"
                          defaultValue="Pharmacy_ID"
                          className="h-6 w-full appearance-none rounded-sm border border-slate-300 bg-white px-2 text-[11px] shadow-inner"
                        >
                          <option>Pharmacy_ID</option>
                        </select>
                        <Search className="pointer-events-none absolute right-2 top-1.5 size-3 text-slate-400" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="grid grid-cols-[70px_1fr] items-center gap-2">
                      <label htmlFor="search-text" className="font-medium">
                        Search Text:
                      </label>
                      <Input
                        id="search-text"
                        value={searchText}
                        onChange={(event) => setSearchText(event.target.value)}
                        className="h-6 rounded-sm border-slate-300 bg-white text-[11px] shadow-inner"
                      />
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                      <Button
                        type="submit"
                        size="sm"
                        variant="outline"
                        className="h-6 w-14 rounded-sm text-[11px]"
                      >
                        Find
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="h-6 w-16 rounded-sm text-[11px]"
                        onClick={() => setSearchText('')}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </section>
        </div>

        <footer className="bg-gradient-to-b from-zinc-800 to-zinc-950 px-2 py-1 text-[10px] text-white">
          Copyright © PharmaLink Inc. 2017
        </footer>
      </section>
    </main>
  )
}
