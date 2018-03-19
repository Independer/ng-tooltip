import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  source = {
    highlight1: `
    Tooltip with icon lg <ind-tooltip content="This is a simple tooltip which uses content attribute" size="lg"></ind-tooltip>

    Tooltip with icon md <ind-tooltip content="This is a simple tooltip which uses content attribute" size="md"></ind-tooltip>

    Tooltip with icon sm (default) <ind-tooltip content="This is a simple tooltip which uses content attribute" size="sm"></ind-tooltip>
    `,
    highlight2: `
    <ind-tooltip content="Tooltip without question mark">
      <a>Click this link!</a>
    </ind-tooltip>

    <ind-tooltip content="Tooltip without question mark">
      <button>Click this button!</button>
    </ind-tooltip>
    `,
    highlight3: `
    Here you will find tooltip header
    <ind-tooltip header="This is tooltip header"
      content="Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen.">
    </ind-tooltip>
    `,
    highlight4: `
    <ind-tooltip header="This is a tooltip with HTML elements">
      <ng-template #tooltipContentTemplate>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, obcaecati. Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen.
        <h4>And a button</h4>
        <div>
          <button>A button</button>
        </div>
      </ng-template>
    </ind-tooltip>
    `
  };
}
