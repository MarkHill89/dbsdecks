import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardText'
})
export class CardTextPipe implements PipeTransform {

  transform(html: string): any {
    if(html === void 0 || typeof html === 'undefined' || html.length === 0 || html === null){
      return;
    }
    html = html.replace(/[\[\]]/g, '');
    html = html.replace(/Auto/g, '<span class="highlight-text auto"><mark>Auto</mark></span>');
    html = html.replace(/\sAwaken(?!ed)\s/gim, '<span class="highlight-text yellow"><mark>Awaken</mark></span>');
    html = html.replace(/Wish/g, '<br><span class="highlight-text yellow"><mark>Wish</mark></span>');
    html = html.replace(/Field/g, '<span class="highlight-text green"><mark>Field</mark></span>');
    html = html.replace(/Blocker/g, '<span class="highlight-text red"><mark>Blocker</mark></span>');
    html = html.replace(/Barrier/g, '<span class="highlight-text red"><mark>Barrier</mark></span>');
    html = html.replace(/Critical/g, '<span class="highlight-text red"><mark>Critical</mark></span>');
    html = html.replace(/Permanent/g, '<span class="highlight-text pink"><mark>Permanent</mark></span>');
    html = html.replace(/Ultimate/g, '<span class="highlight-text red"><mark>Ultimate</mark></span>');
    html = html.replace(/Indestructible/g, '<span class="highlight-text red"><mark>Indestructible</mark></span>');
    html = html.replace(/Union-Fusion/g, '<span class="highlight-text red"><mark>Union-Fusion</mark></span>');
    html = html.replace(/Union-Absorb/g, '<span class="highlight-text red"><mark>Union-Absorb</mark></span>');
    html = html.replace(/Union-Potara/g, '<span class="highlight-text red"><mark>Union-Potara</mark></span>');
    html = html.replace(/Offering/g, '<span class="highlight-text red"><mark>Offering</mark></span>');
    html = html.replace(/Unique/g, '<span class="highlight-text red"><mark>Unique</mark></span>');
    html = html.replace(/Successor/g, '<span class="highlight-text red"><mark>Successor</mark></span>');
    html = html.replace(/Overlord/g, '<span class="highlight-text red"><mark>Overlord</mark></span>');
    html = html.replace(/Servant/g, '<span class="highlight-text red"><mark>Servant</mark></span>');
    html = html.replace(/Super Combo/g, '<span class="highlight-text red"><mark>Super Combo</mark></span>');
    html = html.replace(/Warrior of Universe 7/g, '<span class="highlight-text red"><mark>Warrior of Universe 7</mark></span>');
    html = html.replace(/Dragon Ball/g, '<span class="highlight-text red"><mark>Dragon Ball</mark></span>');
    
    html = html.replace(/((Dual|Triple|Quadruple)(\s)Attack)/g, '<span class="highlight-text red"><mark>'+'$2'+' Attack</mark></span>');
    html = html.replace(/((\w+)(\s)Strike)/g, '<span class="highlight-text red"><mark>'+'$2'+' Strike</mark></span>');

    html = html.replace(/(((\w+)\-)?Evolve)/g,'<span class="highlight-text red"><mark>'+'$2'+' Evolve</mark></span>');

    html = html.replace(/(Dark\s)?(Over Realm)\s?(\d+?)/g, '<span class="highlight-text red"><mark>'+'$1 $2 $3'+'</mark></span>');
    
    html = html.replace(/(Swap\s(\d+)?)/g, '<span class="highlight-text red"><mark>Swap '+'$2'+'</mark></span>');

    html = html.replace(/(Burst\s(\d+)?)/g, '<span class="highlight-text red"><mark> Burst '+'$2'+'</mark></span>');
    
    html = html.replace(/(Sparking\s(\d+)?)/g, '<span class="highlight-text red"><mark>Sparking '+'$2'+'</mark></span>');

    html = html.replace(/Bond 2/g, '<span class="highlight-text red"><mark>Bond 2</mark></span>');
    html = html.replace(/Bond 3/g, '<span class="highlight-text red"><mark>Bond 3</mark></span>');
    html = html.replace(/Bond 4/g, '<span class="highlight-text red"><mark>Bond 4</mark></span>');
    html = html.replace(/Bond 5/g, '<span class="highlight-text red"><mark>Bond 5</mark></span>');
    html = html.replace(/Bond 6/g, '<span class="highlight-text red"><mark>Bond 6</mark></span>');
    html = html.replace(/Bond 7/g, '<span class="highlight-text red"><mark>Bond 7</mark></span>');
    html = html.replace(/Bond 8/g, '<span class="highlight-text red"><mark>Bond 8</mark></span>');
    html = html.replace(/Bond 9/g, '<span class="highlight-text red"><mark>Bond 9</mark></span>');
    html = html.replace(/Bond 10/g, '<span class="highlight-text red"><mark>Bond 10</mark></span>');
    html = html.replace(/Bond/g, '<span class="highlight-text red"><mark>Bond</mark></span>');
    html = html.replace(/Deflect/g, '<span class="highlight-text red"><mark>Deflect</mark></span>');
    html = html.replace(/Wormhole/g, '<span class="highlight-text red"><mark>Wormhole</mark></span>');
    html = html.replace(/Once per turn/g, '<span class="highlight-text red"><mark>Once per turn</mark></span>');
   
    html = html.replace(/Counter(\:\s)?Attack/g, '<span class="highlight-text green"><mark>Counter: Attack</mark></span>');
    html = html.replace(/Counter(\:)?Attack/g, '<span class="highlight-text green"><mark>Counter: Attack</mark></span>');
    html = html.replace(/Counter(\s)?Attack/g, '<span class="highlight-text green"><mark>Counter: Attack</mark></span>');
    html = html.replace(/Counter(\:\s)?Play/g, '<span class="highlight-text green"><mark>Counter: Play</mark></span>');
    html = html.replace(/Counter(\:)?Play/g, '<span class="highlight-text green"><mark>Counter: Play</mark></span>');
    html = html.replace(/Counter(\s)?Play/g, '<span class="highlight-text green"><mark>Counter: Play</mark></span>');
    html = html.replace(/Counter(\:\s)?Counter/g, '<span class="highlight-text green"><mark>Counter: Counter</mark></span>');
    html = html.replace(/Counter(\:)?Counter/g, '<span class="highlight-text green"><mark>Counter: Counter</mark></span>');
    html = html.replace(/Counter(\s)?Counter/g, '<span class="highlight-text green"><mark>Counter: Counter</mark></span>');
    html = html.replace(/Counter(\:\s)?Battle Card Attack/g, '<span class="highlight-text green"><mark>Counter: Battle Card Attack</mark></span>');
    html = html.replace(/Counter(\:)?Battle Card Attack/g, '<span class="highlight-text green"><mark>Counter: Battle Card Attack</mark></span>');
    html = html.replace(/Counter(\s)?Battle Card Attack/g, '<span class="highlight-text green"><mark>Counter: Battle Card Attack</mark></span>');
    html = html.replace(/Counter/g, '<span class="highlight-text green"><mark>Counter</mark></span>');
    html = html.replace(/Activate\: Main/g, '<span class="highlight-text main"><mark>Activate: Main</mark></span>');
    html = html.replace(/Activate(\:|\s)?Main/g, '<span class="highlight-text main"><mark>Activate: Main</mark></span>');
    html = html.replace(/(\[)Activate(\:\s)Battle/g, '<span class="highlight-text main"><mark>Activate: Battle</mark></span>');
    html = html.replace(/Activate(\:|\s)?Battle/g, '<span class="highlight-text main"><mark>Activate: Battle</mark></span>');

    html = html.replace(/Aegis(?!\s)/g, "<span class='highlight-text red'><mark>Aegis</mark></span>");
    html = html.replace(/Energy-Exhaust/g, '<span class="highlight-text red"><mark>Energy-Exhaust</mark></span>');
    html = html.replace(/(?:Aegis|Arrival|Alliance)\s(?:Red|Blue|Yellow|Green)\/(?:Red|Blue|Yellow|Green)/g, "<span class='highlight-text red'><mark>"+'$&'+"</mark></span>");

    html = html.replace(/\(R\)/g, '<svg height="16" width="16"><circle cx="8" cy="8" r="7" stroke="black" stroke-width="1" fill="#B40F15" /></svg>');
    html = html.replace(/\(B\)/g, '<svg height="16" width="16"><circle cx="8" cy="8" r="7" stroke="black" stroke-width="1" fill="#1163AB" /></svg>');
    html = html.replace(/\(G\)/g, '<svg height="16" width="16"><circle cx="8" cy="8" r="7" stroke="black" stroke-width="1" fill="#028D30" /></svg>');
    html = html.replace(/\(Y\)/g, '<svg height="16" width="16"><circle cx="8" cy="8" r="7" stroke="black" stroke-width="1" fill="#F7C600" /></svg>');
    html = html.replace(/\(BU\)/g, '<svg height="16" width="16"><circle cx="8" cy="8" r="7" stroke="black" stroke-width="1" fill="#1163AB" /></svg>');
    html = html.replace(/\(1\)/g, '<svg height="16" width="16"><g><circle cx="8" cy="8" r="7" stroke="black" fill="white" stroke-width="1"></circle><text x="5" y="12" fill="#000000" font-size="12">1</text></g></svg>');
    html = html.replace(/\(2\)/g, '<svg height="16" width="16"><g><circle cx="8" cy="8" r="7" stroke="black" fill="white" stroke-width="1"></circle><text x="5" y="12" fill="#000000" font-size="12">2</text></g></svg>');
    html = html.replace(/\(3\)/g, '<svg height="16" width="16"><g><circle cx="8" cy="8" r="7" stroke="black" fill="white" stroke-width="1"></circle><text x="5" y="12" fill="#000000" font-size="12">3</text></g></svg>');
    html = html.replace(/\(4\)/g, '<svg height="16" width="16"><g><circle cx="8" cy="8" r="7" stroke="black" fill="white" stroke-width="1"></circle><text x="5" y="12" fill="#000000" font-size="12">4</text></g></svg>');
    html = html.replace(/\(5\)/g, '<svg height="16" width="16"><g><circle cx="8" cy="8" r="7" stroke="black" fill="white" stroke-width="1"></circle><text x="5" y="12" fill="#000000" font-size="12">5</text></g></svg>');
    html = html.replace(/\(6\)/g, '<svg height="16" width="16"><g><circle cx="8" cy="8" r="7" stroke="black" fill="white" stroke-width="1"></circle><text x="5" y="12" fill="#000000" font-size="12">6</text></g></svg>');
    html = html.replace(/\(7\)/g, '<svg height="16" width="16"><g><circle cx="8" cy="8" r="7" stroke="black" fill="white" stroke-width="1"></circle><text x="5" y="12" fill="#000000" font-size="12">7</text></g></svg>');
    html = html.replace(/\(8\)/g, '<svg height="16" width="16"><g><circle cx="8" cy="8" r="7" stroke="black" fill="white" stroke-width="1"></circle><text x="5" y="12" fill="#000000" font-size="12">8</text></g></svg>');
    html = html.replace(/\(9\)/g, '<svg height="16" width="16"><g><circle cx="8" cy="8" r="7" stroke="black" fill="white" stroke-width="1"></circle><text x="5" y="12" fill="#000000" font-size="12">9</text></g></svg>');
    html = html.replace(/\(10\)/g, '<svg height="16" width="16"><g><circle cx="8" cy="8" r="7" stroke="black" fill="white" stroke-width="1"></circle><text x="3" y="12" fill="#000000" font-size="10">10</text></g></svg>');
    html = html.replace(/\(16\)/g, '<svg height="16" width="16"><g><circle cx="8" cy="8" r="7" stroke="black" fill="white" stroke-width="1"></circle><text x="3" y="12" fill="#000000" font-size="10">16</text></g></svg>');
    html = html.replace(/[\?]/g, '"');
    html = html.replace(/[\\]/g, "");
    return html;
  }
}
