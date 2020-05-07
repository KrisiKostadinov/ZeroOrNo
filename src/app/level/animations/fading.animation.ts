import {trigger, style, animate, transition, state} from '@angular/animations';

export const FirstFading =
        trigger('firstFading', [
          state('in', style({
            opacity: 1,
            transform: 'translateX(0)',
          })),
          transition(':enter', [
            style({
              opacity: 0,
              transform: 'translateX(-100px)',
            }),
            animate(100, style({
              opacity: 1,
              transform: 'translateX(0)',
            }))
          ]),
          transition(':leave', [
            style({ opacity: 1 }),
            animate(100, style({
              opacity: 0,
              transform: 'translateX(100px)',
            }))
          ])
        ])
        
export const SecondFading =
        trigger('secondFading', [
          state('in', style({
            opacity: 1,
            transform: 'scale(1)',
          })),
          transition(':enter', [
            style({
              opacity: 0,
              transform: 'scale(0)',
            }),
            animate(1000, style({
              opacity: 1,
              transform: 'scale(1)',
            }))
          ]),
          transition(':leave', [
            style({
              opacity: 1,
              transform: 'scale(1)',
            }),
            animate(1000, style({
              opacity: 0,
              transform: 'scale(0)',
            }))
          ])
        ])