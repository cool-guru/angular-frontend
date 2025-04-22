import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'folder/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [
        { id: '68079d4a062ca4ed22f97578' }
      ];
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
