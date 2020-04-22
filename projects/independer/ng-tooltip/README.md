# ng-tooltip
Clickable angular tooltip popup
​
## Online Demo (Stackblitz)
https://independer-ng-tooltip-playground.stackblitz.io

## Compatibility
Tested and published with Angular 9.1.1
​
## Installation
This package has a peer dependency on `@angular/cdk`, so you have to first install it by running:

```bash
$ npm install @angular/cdk@9.x --save
```

Install ng-tooltip via npm by running this command:
```bash
$ npm install @independer/ng-tooltip --save
```
 
## Usage
 
Add `TooltipModule` to your main `app.module.ts`
​
```ts
// app.module.ts
​
import { TooltipModule } from '@independer/ng-tooltip';
  
@NgModule({
  imports: [
    TooltipModule.forRoot() // This .forRoot() is necessary
  ]
})
export class AppModule { }
```
​
​
## Variations
​
### Default tooltip
By default, the tooltip trigger will be a question mark icon like this: ![tooltip icon](https://image.ibb.co/bL6Czc/question_mark.png)
<br />
<br />​
The icons are available in 3 different sizes sm, md, lg
```html
Tooltip with icon lg <ind-tooltip content="This is a simple tooltip which uses content attribute" size="lg"></ind-tooltip>
Tooltip with icon md <ind-tooltip content="This is a simple tooltip which uses content attribute" size="md"></ind-tooltip>
Tooltip with icon sm (default) <ind-tooltip content="This is a simple tooltip which uses content attribute" size="sm"></ind-tooltip>
```
### Custom tooltip trigger
You can replace the tooltip trigger (question-mark icon) with your own icons or custom HTML element.
```html
<ind-tooltip content="Tooltip without question mark">
  <a>Click this link!</a> 
</ind-tooltip>
```
​
### Tooltip with header and content
Inside the tooltip you can write optionally header and content separately.
```html
<ind-tooltip header="This is tooltip header" content="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum."></ind-tooltip>
```
​
### Tooltip with HTML content
It is also possible to have custom HTML content inside the tooltip by declaring `<ng-template #tooltipContentTemplate></ng-template>` inside `<ind-tooltip></ind-tooltip>`. The hash `tooltipContentTemplate` will mark it as HTML content inside tooltip, so it msut be written exactly the same.
​
```html
<ind-tooltip header="This is a tooltip with HTML elements"> 
  <ng-template #tooltipContentTemplate> 
    Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum. 
    <h4>And a button</h4> 
    <button>A button</button>
  </ng-template>
</ind-tooltip>
```
