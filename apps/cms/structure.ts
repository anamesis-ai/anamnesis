import { StructureBuilder, StructureResolverContext } from 'sanity/structure';

export const structure = (
  S: StructureBuilder,
  _context: StructureResolverContext
) =>
  S.list()
    .title('Content')
    .items([
      // Blog Section
      S.listItem()
        .title('📝 Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('Posts')
                .schemaType('post')
                .child(S.documentTypeList('post').title('Posts')),
              S.listItem()
                .title('Authors')
                .schemaType('author')
                .child(S.documentTypeList('author').title('Authors')),
            ])
        ),

      // Directory Section
      S.listItem()
        .title('📂 Directory')
        .child(
          S.list()
            .title('Directory')
            .items([
              S.listItem()
                .title('Directory Items')
                .schemaType('directoryItem')
                .child(
                  S.documentTypeList('directoryItem')
                    .title('Directory Items')
                    .filter('_type == "directoryItem"')
                ),
            ])
        ),

      // Divider
      S.divider(),

      // Additional items that might be created
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['post', 'author', 'directoryItem', 'blockContent'].includes(
            listItem.getId() || ''
          )
      ),
    ]);
