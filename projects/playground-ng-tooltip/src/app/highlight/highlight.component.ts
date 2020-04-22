import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss']
})
export class HighlightComponent implements OnInit {
  @Input() language: string;
  @Input() source: string;

  formattedSource: string;

  ngOnInit() {
    // replace > and < with encoded string
    this.formattedSource = this.source.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    if (this.language.toLowerCase() === 'html') {
      this.formattedSource = this.highlightHtml(this.formattedSource);
    }
  }

  private highlightHtml(formattedSource: string) {
    // REFORMAT STRING LITERALS
    formattedSource = formattedSource.replace(/("[\w\'\s\r\n\*\/\#\-\_\.\,]*")|('[\w\'\s\r\n\*\/\#\-\_\.\,]*')/g, '<span class="stringlighted">$1</span>');

    // REFORMAT COMMENTS
    formattedSource = formattedSource.replace(/(&lt;!--[\w\'\s\r\n\*]*--&gt;)|(\/\/[\w\s\']*)/gm, '<span class="lowlighted">$1</span>');

    formattedSource = formattedSource.replace(/(#tooltipContentTemplate)/gm, '<span class="tooltip-content-template">$1</span>');

    // REFORMAT HTML TAGS
    // get all text starting with '<'
    let elements = formattedSource.split('&lt;');

    // remove index 0
    elements.shift();

    // get the element name
    elements = elements.map(element => element.replace(/&gt;/g, ' ').replace(/ .*/gm, '').replace(/\s/g, ''));

    // get unique name of element in the array and do some reformatting
    elements = elements.filter((value, index, self) => {
      return self.indexOf(value) === index && value.indexOf('/') === -1 && value !== '!--'; // value is unique | value is not closing HTML tag | value is not comment
    });

    // test all matched elements
    // console.log(elements);

    // replace the formattedSource
    for (const element of elements) {
      // replace HTML closing tag                   ---> </ind-something>
      formattedSource = formattedSource.replace(new RegExp(`&lt;/${element}&gt;`, 'gm'), `&lt;/<span class="highlighted">${element}</span>&gt;`);

      // replace HTML opening tag with properties   ---> <ind-something [someAttr]="1">
      formattedSource = formattedSource.replace(new RegExp(`&lt;${element} `, 'gm'), `&lt;<span class="highlighted">${element}</span> `);

      // replace HTML opening tag without prop      ---> <ind-something>
      formattedSource = formattedSource.replace(new RegExp(`&lt;${element}&gt;`, 'gm'), `&lt;<span class="highlighted">${element}</span>&gt;`);
    }

    // test result
    // console.log(formattedSource);

    return formattedSource;
  }
}
