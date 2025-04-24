import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'folder/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [
        { id: '680a5c902c1c63f309cd2008' }
      ];
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
