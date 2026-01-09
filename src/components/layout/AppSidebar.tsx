import { useState } from 'react';
import { 
  MessageSquare, 
  Star, 
  Database, 
  ChevronRight, 
  Plus,
  Search,
  Settings,
  HelpCircle,
  ChevronLeft,
  Table2,
  Key,
  Link2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockChatSessions, mockTemplates, mockDatabaseSchema } from '@/data/mockData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface AppSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  onNewChat: () => void;
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
}

export function AppSidebar({ 
  isCollapsed, 
  onToggle, 
  onNewChat, 
  activeChatId, 
  onSelectChat 
}: AppSidebarProps) {
  const [historyOpen, setHistoryOpen] = useState(true);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const [schemaOpen, setSchemaOpen] = useState(false);

  return (
    <aside 
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-72"
      )}
    >
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-3 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Database className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold text-sidebar-foreground">QueryAI</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggle}
          className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        {isCollapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={onNewChat}
                className="w-full h-10 bg-primary hover:bg-primary/90 glow-primary"
                size="icon"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">New Chat</TooltipContent>
          </Tooltip>
        ) : (
          <Button 
            onClick={onNewChat}
            className="w-full bg-primary hover:bg-primary/90 glow-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        )}
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="px-3 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search chats..." 
              className="pl-9 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-2">
          {/* Chat History */}
          <Collapsible open={historyOpen && !isCollapsed} onOpenChange={setHistoryOpen}>
            {isCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-full h-10 text-sidebar-foreground hover:bg-sidebar-accent"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Chat History</TooltipContent>
              </Tooltip>
            ) : (
              <>
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between text-sidebar-foreground hover:bg-sidebar-accent"
                  >
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat History</span>
                    </div>
                    <ChevronRight className={cn(
                      "w-4 h-4 transition-transform",
                      historyOpen && "rotate-90"
                    )} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 pt-1">
                  {mockChatSessions.map((session) => (
                    <button
                      key={session.id}
                      onClick={() => onSelectChat(session.id)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                        "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent",
                        activeChatId === session.id && "bg-sidebar-accent text-sidebar-foreground border-l-2 border-primary"
                      )}
                    >
                      <div className="truncate">{session.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {session.updatedAt.toLocaleDateString()}
                      </div>
                    </button>
                  ))}
                </CollapsibleContent>
              </>
            )}
          </Collapsible>

          {/* Saved Templates */}
          <Collapsible open={templatesOpen && !isCollapsed} onOpenChange={setTemplatesOpen}>
            {isCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-full h-10 text-sidebar-foreground hover:bg-sidebar-accent"
                  >
                    <Star className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Saved Templates</TooltipContent>
              </Tooltip>
            ) : (
              <>
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between text-sidebar-foreground hover:bg-sidebar-accent"
                  >
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      <span>Templates</span>
                    </div>
                    <ChevronRight className={cn(
                      "w-4 h-4 transition-transform",
                      templatesOpen && "rotate-90"
                    )} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 pt-1">
                  {mockTemplates.map((template) => (
                    <button
                      key={template.id}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                    >
                      <div className="truncate">{template.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 truncate">
                        {template.description}
                      </div>
                    </button>
                  ))}
                </CollapsibleContent>
              </>
            )}
          </Collapsible>

          {/* Schema Browser */}
          <Collapsible open={schemaOpen && !isCollapsed} onOpenChange={setSchemaOpen}>
            {isCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-full h-10 text-sidebar-foreground hover:bg-sidebar-accent"
                  >
                    <Database className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Database Schema</TooltipContent>
              </Tooltip>
            ) : (
              <>
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between text-sidebar-foreground hover:bg-sidebar-accent"
                  >
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      <span>Schema</span>
                    </div>
                    <ChevronRight className={cn(
                      "w-4 h-4 transition-transform",
                      schemaOpen && "rotate-90"
                    )} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 pt-1">
                  {mockDatabaseSchema.map((table) => (
                    <Collapsible key={table.name}>
                      <CollapsibleTrigger asChild>
                        <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors flex items-center justify-between group">
                          <div className="flex items-center gap-2">
                            <Table2 className="w-3.5 h-3.5" />
                            <span>{table.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {table.rowCount.toLocaleString()}
                          </span>
                        </button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-6 space-y-0.5">
                        {table.columns.map((col) => (
                          <div 
                            key={col.name}
                            className="flex items-center gap-2 px-2 py-1 text-xs text-muted-foreground"
                          >
                            {col.isPrimaryKey && <Key className="w-3 h-3 text-warning" />}
                            {col.isForeignKey && <Link2 className="w-3 h-3 text-primary" />}
                            {!col.isPrimaryKey && !col.isForeignKey && <span className="w-3" />}
                            <span className="truncate">{col.name}</span>
                            <span className="text-muted-foreground/60 ml-auto">{col.type.split('(')[0]}</span>
                          </div>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </CollapsibleContent>
              </>
            )}
          </Collapsible>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        {isCollapsed ? (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="w-full h-10 text-sidebar-foreground hover:bg-sidebar-accent"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="w-full h-10 text-sidebar-foreground hover:bg-sidebar-accent"
                >
                  <HelpCircle className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Help</TooltipContent>
            </Tooltip>
          </>
        ) : (
          <>
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
              <HelpCircle className="w-4 h-4 mr-2" />
              Help & Support
            </Button>
          </>
        )}
      </div>
    </aside>
  );
}
