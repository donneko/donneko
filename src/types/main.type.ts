export interface Link {
    href: string;
    label: string;
    external: boolean;
}

export interface LinkTable extends Link {
    description: string;
}

export interface ProjectMedia {
    type: "image" | "video";
    src: string;
    alt: string;
}

export interface Project {
    title: string;
    category: string;
    media: ProjectMedia[];
    description: string;
    links?: Link[];
}
