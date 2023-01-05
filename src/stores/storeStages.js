import { defineStore } from 'pinia'

export const useStoreStages = defineStore('storeStages', {
  state: () => {
    return {
      stages: [
        {
          id: 'stage1',
          title: 'Niveau 1',
          png: [,,,,,,
                ,,,,,,
                ,,,,,,],
          questions: [
            '\\dfrac{2 \\times 2}{2 + 2}=',
            '2 \\times 2 - 2=',
            '\\dfrac{2\\times2\\times2-2}{2}=',
            '2\\times2-2+2=',
            '2+\\dfrac{2}{2}+2=',
            '2+2\\times2=',
            '2\\times(2+2)-\\dfrac{2}{2}=',
            '2\\times2+2\\times2=',
            '(2+2)\\times2+\\dfrac{2}{2}=',
            '(2+2\\times2)\\times2-2=',
            '2+2\\times2\\times2+2-\\dfrac{2}{2}=',
            '2\\times2\\times\\left(2+\\dfrac{2}{2}\\right)=',
            '\\dfrac{3\\times3}{3+3+3}=',
            '\\dfrac{3+3}{3}=',
            '3\\times3-(3+3)=',
            '3+\\dfrac{3}{3}=',
            '3+\\dfrac{3+3}{3}=',
            '\\dfrac{3\\times3+3\\times3}{3}=',
            '3+3\\div3+3=',
            '3\\times3-3\\div3=',
            '3\\times3\\div(3\\div3)=',
            '\\dfrac{33-3}{3}=',
            '3\\times3+3-3\\div 3=',
            '3+3\\times3=',
          ],
          type: ['e','e','e','e','e','e','e','e','e','e','e','e','e','e','e','e','e','e','e','e','e','e','e','e'],
          vrai: [1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12],
          faux: [4,0,7,0,6,8,3,16,7,14,17,9,10,4,9,2,1,30,5,0,1,8,12,18]
        },
        {
          id: 'stage2',
          title: 'Niveau 2',
          png: [,,,,,,
                ,,,,,,
                ,,,,,,],
          questions: [
            '\\text{Dans un repère, on a représenté une fonction. Les images se lisent :}',
            '\\text{Dans un repère, on a représenté une fonction. Les images se lisent :}',
            '\\text{Dans un tableau de valeurs d\'une fonction, les antécédents se lisent :}',
            'tableau'
          ],
          vrai: [
            '\\text{sur l\'axe des ordonnées}',
            '\\text{sur l\'axe des ordonnées}',
            '\\text{sur la première ligne}',
            '2'
          ],
          faux: [
            '\\text{sur l\'axe des abscisses}',
            '\\text{sur la courbe}',
            '\\text{sur la seconde ligne}',
            '-1'
          ]
        },
        {
          id: 'stage3',
          title: 'Niveau 3',
        },
        { 
          id: 'stage4',
          title: 'Niveau 4',
        }
      ],
    }
  },
  actions: {
    
  },
  getters: {
    
  }
})