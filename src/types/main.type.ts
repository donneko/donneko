import type { Link } from "../components/link.astro";

export interface LinkTable extends Link {
    description: string;
}

export interface Project {
    title: string;
    hasScreenshot: boolean;
    src: string;
    alt: string;
    description: string;
    links?: Link[];
}
