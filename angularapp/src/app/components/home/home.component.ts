import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.initTypewriter();
  }

  private initTypewriter(): void {
    const text = "Welcome to Training Hub Platform";
    const typewriterElement = document.getElementById("typewriter");
 
    if (!typewriterElement) return;
 
    let index = 0;
 
    function type() {
      if (index < text.length) {
        typewriterElement.textContent += text.charAt(index);
        index++;
        setTimeout(type, 60); // Adjust typing speed
      } else {
        // Reset after completion and restart typing after delay
        setTimeout(() => {
          typewriterElement.textContent = '';
          index = 0;
          type();
        }, 5000); // Adjust delay before restarting
      }
    }
 
    type();
  }

}
