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
            ['e','\\dfrac{2 \\times 2}{2 + 2}='],
            ['e','2 \\times 2 - 2='],
            ['e','\\dfrac{2\\times2\\times2-2}{2}='],
            ['e','2\\times2-2+2='],
            ['e','2+\\dfrac{2}{2}+2='],
            ['e','2+2\\times2='],
            ['e','2\\times(2+2)-\\dfrac{2}{2}='],
            ['e','2\\times2+2\\times2='],
            ['e','(2+2)\\times2+\\dfrac{2}{2}='],
            ['e','(2+2\\times2)\\times2-2='],
            ['e','2+2\\times2\\times2+2-\\dfrac{2}{2}='],
            ['e','2\\times2\\times\\left(2+\\dfrac{2}{2}\\right)='],
            ['e','\\dfrac{3\\times3}{3+3+3}='],
            ['e','\\dfrac{3+3}{3}='],
            ['e','3\\times3-(3+3)='],
            ['e','3+\\dfrac{3}{3}='],
            ['e','3+\\dfrac{3+3}{3}='],
            ['e','\\dfrac{3\\times3+3\\times3}{3}='],
            ['e','3+3\\div3+3='],
            ['e','3\\times3-3\\div3='],
            ['e','3\\times3\\div(3\\div3)='],
            ['e','\\dfrac{33-3}{3}='],
            ['e','3\\times3+3-3\\div 3='],
            ['e','3+3\\times3='],
          ],
          vrai: [['e',1],['e',2],['e',3],['e',4],['e',5],['e',6],['e',7],['e',8],['e',9],['e',10],['e',11],['e',12],['e',1],['e',2],['e',3],['e',4],['e',5],['e',6],['e',7],['e',8],['e',9],['e',10],['e',11],['e',12]],
          faux: [['e',4],['e',0],['e',7],['e',0],['e',6],['e',8],['e',3],['e',16],['e',7],['e',14],['e',17],['e',9],['e',10],['e',4],['e',9],['e',2],['e',1],['e',30],['e',5],['e',0],['e',1],['e',8],['e',12],['e',18]]
        },
        {
          id: 'stage2',
          title: 'Niveau 2',
          png: [,,,,,,
                ,,,,,,
                ,,,,,,],
          questions: [
            [['t','Dans un repère, on a représenté une fonction.'],['t','Les nimages se lisent :']],
            [['t','Dans un repère, on a représenté une fonction. Les images se lisent :']]
            [['t','Dans un tableau de valeurs d\'une fonction, les antécédents se lisent :']],
            [['t','Dans un tableau de valeurs d\'une fonction, les images se lisent :']]
          ],
          vrai: [
            ['t','sur l\'axe des ordonnées'],
            ['t','sur l\'axe des ordonnées']
            ['t','sur la première ligne'],
            ['t','sur la seconde ligne']
          ],
          faux: [
            ['t','sur l\'axe des abscisses'],
            ['t','sur la courbe']
            ['t','sur la seconde ligne'],
            ['t','sur la première ligne']
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