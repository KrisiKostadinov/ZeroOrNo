import { Component, OnInit } from '@angular/core';
import { Card } from '../models/card.model';
import { FirstFading, SecondFading, LevelCompleted } from '../animations/fading.animation';

@Component({
  selector: 'app-playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.css'],
  animations: [FirstFading, SecondFading, LevelCompleted]
})
export class PlayingComponent implements OnInit {

  stateCompletedLevel: string = '';
  levelCompleted: boolean = false;
  levelLost: boolean = false;
  reservedCard: Card;
  cards: Card[] = [];
  currentCards: Card[] = [];
  index: number = 0;
  result: number = 10;

  currentLevel: number = 1;

  initialization() {
    this.nextLevel();
    this.generateNumbers(this.currentLevel);
  }
  
  nextLevel() {
    this.levelCompleted = false;
    this.levelLost = false;
    this.currentCards = [];
    this.cards = [];
    for(let i = 0; i < 4; i++) {
      this.currentCards.push(new Card(0));
    }
    this.index = 0;
    this.result = 10;
  }

  ngOnInit(): void {
    this.initialization();
  }

  isPos(index: number) {
    return this.currentCards[index].number < 0;
  }

  generateNumbers(to: number = null) {
    for(let i = 1; i < 10 + to - 1; i++) {
      const numberPos = Math.floor(Math.random() * 6) + 1;
      const numberNeg = -Math.floor(Math.random() * 6) - 1;
      if(numberPos % 2 === 0) {
        this.cards.push(new Card(numberPos));
      } else {
        this.cards.push(new Card(numberNeg));
      }
    }

    this.nextCard();
  }

  nextCard(index: number = -1, isDraggingCard: boolean = false) {
    if(index === -1) {
      for(let i = 0; i < 4; i++) {
        this.currentCards[i].number = this.cards[i].number;
      }
    }

    if(index === -1) {
      index++;
      return;
    }
    
    if(this.isCompletedLevel(isDraggingCard)) {
      return;
    }

    if(!isDraggingCard) {
      this.result += this.currentCards[index].number;
      this.currentCards[index].number = this.cards[this.index].number;
      this.currentCards[index].isShow = false;
      this.index++;
    }

    if(this.isLost()) {
      return;
    }

    setTimeout(() => {
      this.currentCards[index].isShow = true;
    }, 100);
  }

  isLost() {
    if(this.result > 20 || this.result <= 0) {
      this.levelLost = true;
      return true;
    }

    return false;
  }

  reset() {
    this.initialization();
  }

  isCompletedLevel(isDraggingCard: boolean = false) {
    if(this.index >= this.cards.length && !isDraggingCard) {
      this.levelCompleted = true;
      this.currentLevel++;

      return true;
    }

    return false;
  }
  
  onDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
  }

  onDragOver(event) {
    event.preventDefault();
  }

  onDrop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");

    let copyDiv = document.getElementById(data).cloneNode();
    let copyH2 = document.getElementById(data).firstChild.cloneNode();
    let id = document.getElementById(data).id;
    copyH2.textContent = document.getElementById(data).firstChild.textContent;
    copyDiv.appendChild(copyH2);
    event.target.appendChild(copyDiv);
    
    if(copyDiv.parentElement.childNodes.length > 1) {
      copyDiv.parentElement.lastChild.remove();

      return;
    }
    document.getElementsByClassName('card')[4].setAttribute('id', '4');

    this.reservedCard = new Card(+copyH2.textContent);

    this.nextCard(+id, true);
    copyH2.addEventListener('click', (event) => {
      event.target.removeEventListener;
      document.getElementById('4').remove();
      this.result += this.reservedCard.number;
      if(this.isLost()) {
        return;
      }
      if(this.isCompletedLevel()) {
        return;
      }

      this.index++;
    });
  }
}
