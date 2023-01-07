import { defineStore } from 'pinia'

export const useStoreStages = defineStore('storeStages', {
  state: () => {
    return {
      stages: [
        {
          id: 'stage1',
          title: 'Niveau 1',
          type: 'Priorités de calcul',
          png: [,,,,,,
                ,,,,,,
                ,,,,,,],
          questions: [
            [['e','\\dfrac{2 \\times 2}{2 + 2}=']],
            [['e','2 \\times 2 - 2=']],
            [['e','\\dfrac{2\\times2\\times2-2}{2}=']],
            [['e','2\\times2-2+2=']],
            [['e','2+\\dfrac{2}{2}+2=']],
            [['e','2+2\\times2=']],
            [['e','2\\times(2+2)-\\dfrac{2}{2}=']],
            [['e','2\\times2+2\\times2=']],
            [['e','(2+2)\\times2+\\dfrac{2}{2}=']],
            [['e','(2+2\\times2)\\times2-2=']],
            [['e','2+2\\times2\\times2+2-\\dfrac{2}{2}=']],
            [['e','2\\times2\\times\\left(2+\\dfrac{2}{2}\\right)=']],
            [['e','\\dfrac{3\\times3}{3+3+3}=']],
            [['e','\\dfrac{3+3}{3}=']],
            [['e','3\\times3-(3+3)=']],
            [['e','3+\\dfrac{3}{3}=']],
            [['e','3+\\dfrac{3+3}{3}=']],
            [['e','\\dfrac{3\\times3+3\\times3}{3}=']],
            [['e','3+3\\div3+3=']],
            [['e','3\\times3-3\\div3=']],
            [['e','3\\times3\\div(3\\div3)=']],
            [['e','\\dfrac{33-3}{3}=']],
            [['e','3\\times3+3-3\\div 3=']],
            [['e','3+3\\times3=']],
          ],
          vrai: [['e',1],['e',2],['e',3],['e',4],['e',5],['e',6],['e',7],['e',8],['e',9],['e',10],['e',11],['e',12],['e',1],['e',2],['e',3],['e',4],['e',5],['e',6],['e',7],['e',8],['e',9],['e',10],['e',11],['e',12]],
          faux: [['e',4],['e',0],['e',7],['e',0],['e',6],['e',8],['e',3],['e',16],['e',7],['e',14],['e',17],['e',9],['e',10],['e',4],['e',9],['e',2],['e',1],['e',30],['e',5],['e',0],['e',1],['e',8],['e',12],['e',18]]
        },
        {
          id: 'stage2',
          title: 'Niveau 2',
          type: 'Images / antécédents',
          png: [,,,,,,
                ,,,,,,
                ,,,,,,],
          questions: [
            [['t','Dans un repère, on a représenté une fonction.'],['t',' Les images se lisent :']],
            [['t','Dans un repère, on a représenté une fonction. Les images se lisent :']],
            [['t','Dans un tableau de valeurs d\'une fonction, les antécédents se lisent :']],
            [['t','Dans un tableau de valeurs d\'une fonction, les images se lisent :']],
            [['t','La fonction  '],['e','f'],['t',' est telle que '],['e','f(1)=3']],
            [['t','La fonction  '],['e','f'],['t',' est telle que '],['e','f(2)=5']],
            [['t','La fonction '],['e','f'],['t',' est telle que '],['e','f(3)=6']],
            [['t','La courbe représentative de la fonction '],['e','f'],['t',' passe par le point de coordonnées '],['e','(1;2)']],
            [['t','L\'image de '],['e','3'],['t',' par la fonction '],['e','f'],['t',' est '],['e','4'],['t','. La courbe représentative de '],['e','f'],['t',' passe par le point de coordonnéees']],
            [['t','Un antécédent de '],['e','2'],['t',' par la fonction '],['e','f'],['t',' est '],['e','5'],['t','. La courbe représentative de '],['e','f'],['t',' passe par le point de coordonnées']],
            [['t','Voici le tableau de valeurs d\'une fonction '],['e','f'],[['tabh',['e','x'],['e','-2'],['e','-1'],['e','2'],['e','4']],['tabb',['e','f(x)'],['e','5'],['e','4'],['e','3'],['e','2']]],['t','L\'image de '],['e','4'],['t',' est :']]
          ],
          vrai: [
            ['t','sur l\'axe des ordonnées'],
            ['t','sur l\'axe des ordonnées'],
            ['t','sur la première ligne'],
            ['t','sur la seconde ligne'],
            ['t','3 est l\'image de 1 par f'],
            ['t','Le point A (2;5) appartient à C'],
            ['t','3 est un antécédent de 6.'],
            ['e','f(1)=2'],
            ['e','(3;4)'],
            ['e','(5;2)'],
            ['e','2']
          ],
          faux: [
            ['t','sur l\'axe des abscisses'],
            ['t','sur la courbe'],
            ['t','sur la seconde ligne'],
            ['t','sur la première ligne'],
            ['t','1 est l\'image de 3 par f'],            
            ['t','Le point A (5;2) appartient à C'],
            ['t','6 est un antécédent de 3'],
            ['e','f(2)=1'],
            ['e','(4;3)'],
            ['e','(2;5)'],
            ['e','-1']

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