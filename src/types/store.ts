export interface SidebarState {
  open: boolean;
  setOpen: () => void;
}

export interface P {
  title: string;
  description: string;
  social: string;
}

export interface ProjectState {
  project: P | undefined;
  setProject: (p: P) => void;
}

export interface TabState {
  tab: string;
  setTab: (t: string) => void;
}
