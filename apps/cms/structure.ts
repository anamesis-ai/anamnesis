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
                    .canHandleIntent((intentName, params) => {
                      // Handle create intent to show template options
                      return intentName === 'create' && params.template;
                    })
                ),
            ])
        ),

      // Social Media Section
      S.listItem()
        .title('📱 Social Media')
        .child(
          S.list()
            .title('Social Media Management')
            .items([
              S.listItem()
                .title('All Social Posts')
                .child(
                  S.documentTypeList('socialMedia')
                    .title('Social Media Posts')
                    .defaultOrdering([
                      { field: 'scheduledDate', direction: 'asc' },
                      { field: '_createdAt', direction: 'desc' }
                    ])
                ),
              
              S.listItem()
                .title('Draft Campaigns')
                .child(
                  S.documentTypeList('socialMedia')
                    .title('Draft Social Media Campaigns')
                    .filter('status == "draft"')
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                ),
                
              S.listItem()
                .title('Scheduled Posts')
                .child(
                  S.documentTypeList('socialMedia')
                    .title('Scheduled Social Media Posts')
                    .filter('status == "scheduled"')
                    .defaultOrdering([{ field: 'scheduledDate', direction: 'asc' }])
                ),
                
              S.listItem()
                .title('Published Posts')
                .child(
                  S.documentTypeList('socialMedia')
                    .title('Published Social Media Posts')
                    .filter('status == "published"')
                    .defaultOrdering([{ field: 'scheduledDate', direction: 'desc' }])
                ),
            ])
        ),

      // Divider
      S.divider(),

      // Additional items that might be created
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['post', 'author', 'directoryItem', 'socialMedia', 'blockContent'].includes(
            listItem.getId() || ''
          )
      ),
    ]);
