// Astro 7に同梱されるSätteriの公式プラグインAPIを使う。追加パッケージは不要。
/** @type {import("satteri").MdastPluginDefinition} */
export const safeMarkdown = {
    name: "safe-blog-markdown",
    html(node, context) {
        context.removeNode(node);
    },
    link: restrictUrl,
    image: restrictUrl,
    definition: restrictUrl,
};

/**
 * @param {Readonly<import("mdast").Link | import("mdast").Image | import("mdast").Definition>} node
 * @param {import("satteri").MdastVisitorContext} context
 */
function restrictUrl(node, context) {
    const url = node.url.replace(/[\p{Cc}\s]/gu, "");
    const scheme = /^([a-z][a-z0-9+.-]*):/i.exec(url)?.[1].toLowerCase();
    if (scheme && !["http", "https", "mailto", "tel"].includes(scheme)) {
        context.setProperty(node, "url", "");
    }
}

/** @type {import("satteri").HastPluginDefinition} */
export const accessibleMarkdown = {
    name: "accessible-blog-markdown",
    element: [
        {
            filter: ["table"],
            visit(node, context) {
                context.wrapNode(node, {
                    type: "element",
                    tagName: "div",
                    properties: {
                        className: ["blog-table-scroll"],
                        role: "region",
                        tabIndex: 0,
                        ariaLabel: "表（横スクロールできます）",
                    },
                    children: [],
                });
            },
        },
        {
            filter: ["pre"],
            visit(node, context) {
                context.setProperty(node, "tabIndex", 0);
            },
        },
    ],
};
