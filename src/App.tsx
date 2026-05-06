import {
  ArrowRight,
  Layers3,
  MonitorDot,
  PanelLeft,
  Workflow,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  prototypePrinciples,
  setupChecklist,
  starterScreens,
} from '@/prototype/platform-map'

function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-3xl border bg-card p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Workflow className="size-6" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <Badge variant="secondary" className="rounded-full">
                Prototype workspace
              </Badge>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Prophet Legacy Platform Recreation
              </h1>
              <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
                A React, Tailwind, and shadcn/ui prototype for rebuilding platform
                screens from screenshots and explaining how the experience is
                connected.
              </p>
            </div>
          </div>
          <Button className="w-full rounded-full lg:w-auto">
            Ready for first screenshot
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </header>

        <div className="grid flex-1 gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-3xl border bg-card p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium">
              <PanelLeft className="size-4 text-muted-foreground" aria-hidden="true" />
              Prototype map
            </div>
            <nav className="space-y-2" aria-label="Prototype sections">
              {starterScreens.map((screen) => {
                const Icon = screen.icon

                return (
                  <button
                    key={screen.name}
                    type="button"
                    className="flex w-full items-start gap-3 rounded-2xl border bg-background p-3 text-left transition hover:bg-accent"
                  >
                    <Icon className="mt-0.5 size-4 text-muted-foreground" aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">{screen.name}</span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {screen.status}
                      </span>
                    </span>
                  </button>
                )
              })}
            </nav>
          </aside>

          <section className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {setupChecklist.map((item) => {
                const Icon = item.icon

                return (
                  <Card key={item.title} className="rounded-3xl">
                    <CardHeader>
                      <div className="mb-3 flex size-10 items-center justify-center rounded-2xl bg-secondary">
                        <Icon className="size-5" aria-hidden="true" />
                      </div>
                      <CardTitle className="text-base">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>

            <Tabs defaultValue="workspace" className="rounded-3xl border bg-card p-2 shadow-sm">
              <TabsList className="grid w-full grid-cols-3 rounded-2xl">
                <TabsTrigger value="workspace">Workspace</TabsTrigger>
                <TabsTrigger value="principles">Principles</TabsTrigger>
                <TabsTrigger value="figma">Figma-ready</TabsTrigger>
              </TabsList>
              <TabsContent value="workspace" className="m-0 p-4">
                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                  <Card className="rounded-3xl border-dashed">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MonitorDot className="size-5" aria-hidden="true" />
                        First screen slot
                      </CardTitle>
                      <CardDescription>
                        Send the first screenshot and this area will become the recreated
                        screen.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex min-h-80 items-center justify-center rounded-3xl border border-dashed bg-muted/40 p-8 text-center">
                        <div className="max-w-md space-y-3">
                          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-background shadow-sm">
                            <Layers3 className="size-6 text-muted-foreground" aria-hidden="true" />
                          </div>
                          <h2 className="text-xl font-semibold tracking-tight">
                            Waiting for screenshot reference
                          </h2>
                          <p className="text-sm leading-6 text-muted-foreground">
                            I will match the information architecture, spacing,
                            hierarchy, controls, and user journey while keeping the
                            shadcn visual system as the base.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="rounded-3xl">
                    <CardHeader>
                      <CardTitle>Screen notes template</CardTitle>
                      <CardDescription>
                        Notes we will capture as each screenshot is recreated.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                      {[
                        'Primary user goal',
                        'Visible navigation and hierarchy',
                        'Important states and edge cases',
                        'Connected upstream and downstream screens',
                      ].map((note) => (
                        <div key={note}>
                          <div className="font-medium">{note}</div>
                          <div className="mt-1 text-muted-foreground">
                            To be filled from the screenshot and your context.
                          </div>
                          <Separator className="mt-4" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="principles" className="m-0 p-4">
                <div className="grid gap-3 md:grid-cols-2">
                  {prototypePrinciples.map((principle) => (
                    <Card key={principle} className="rounded-3xl">
                      <CardContent className="p-5 text-sm leading-6 text-muted-foreground">
                        {principle}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="figma" className="m-0 p-4">
                <Card className="rounded-3xl">
                  <CardHeader>
                    <CardTitle>Future Figma handoff</CardTitle>
                    <CardDescription>
                      The prototype is organized so screens can later be translated into
                      Figma frames and flow diagrams.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3 text-sm text-muted-foreground md:grid-cols-3">
                    <div className="rounded-2xl border bg-background p-4">
                      Componentized screens with clear names.
                    </div>
                    <div className="rounded-2xl border bg-background p-4">
                      Token-based colors, radius, spacing, and typography.
                    </div>
                    <div className="rounded-2xl border bg-background p-4">
                      Flow notes captured alongside each recreated screen.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </div>
    </main>
  )
}

export default App
