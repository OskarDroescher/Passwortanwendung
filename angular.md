# `Angular`

[TOC]

## 1. Angular-CLI

### Ein neues Angular-Projekt

```typescript
ng new 'project-name'
```

| Option  | Beschreibung          | Default-Wert |
| ------- | --------------------- | ------------ |
| routing | Routing-Konfiguration | false        |
| prefix  | Selektor-Präfix       | app          |
| dry-run | ohne Ausführung       | false        |

`````typescript
ng new 'project-name' --routing=true --prefix=ch
`````



### Angular-Project starten

```typescript
npm start
ng serve
```

| Option | Beschreibung       | Default-Wert |
| ------ | ------------------ | ------------ |
| port   | Port der Anwendung | 4200         |
| host   | Host der Anwendung | localhost    |
| watch  | Live-Reload        | true         |

```typescript
ng serve --port=8080 --watch=false
npm start -- --port=8080 --watch=false
```



### Backend einbinden

Sollen Requests an ein Backend erfolgen, kann eine Proxy-Konfigurationsdatei angelegt werden:

```json
// proxy.conf.json
{
  "api/": {
    "target": "http://localhost:3000",
    "secure": false
  }
}
```

So erfolgt eine Weiterleitung von `http://localhost:4200/api` durch:

```typescript
ng serve --proxy-config proxy-conf.json
```

---



## 2. Komponenten und Templates

### Komponenten generieren

Angular Anwendungen bestehen aus Komponenten.

```typescript
ng generate component 'component-name'
ng g c 'component-name'
```

Es wird daraufhin die Komponente mit den Dateien `*.component.css`, `*.component.html`,`*.component.ts` und `*.component.spec.ts` erstellt.

| Option          | Beschreibung                                                 | Default-Wert |
| --------------- | ------------------------------------------------------------ | ------------ |
| flat            | Erstellung direkt im aktuellen Ordner                        | false        |
| inline-template | Der HTML-Template wird direkt in der `*.ts`-Datei erzeugt.   | false        |
| inline-style    | Das Styling wird ebenfalls direkt in der `*.ts`-Datei integriert. | false        |
| skipTests       | Testdatei nicht erzeugen                                     | false        |



### Weitere Generatoren

| Befehl                                           | Beschreibung                                      |
| ------------------------------------------------ | ------------------------------------------------- |
| `ng g c 'name'`                                  | Erstellen einer Komponente                        |
| `ng g s 'name'`                                  | Erstellen einer Service-Klasse                    |
| `ng g m 'name'` , `ng g m 'name' --routing=true` | Erstellen eines Modules mit einem Router          |
| `ng g class 'name'`                              | Erstellen einer Klasse                            |
| `ng g interface 'name'`                          | Erstellen eines Interface                         |
| `ng g guard 'name'`                              | Erstellen eines Router-Guard                      |
| `ng g application 'name'`                        | Erstellt ein zusätzliches Projekt (Multi-Project) |
| `ng g library 'name'`                            | Erzeugt eine Library                              |



### Verbindung von Logik und Darstellung

#### Interpolation

Durch eine Interpolation oder Stringinterpolation wird ein Strings im Html-View ausgegeben. Dieser muss als Variable in der Typescript-Datei deklariert sein. Darüber hinaus können auch Ausdrücke inform einer Funktion oder Berechnung verwandt werden.

```html
<div>{{ variableName }}</div>
```

Das Fragezeichen (?) wird als safe-navigation-Operator interpretiert. Ist das Objekt nicht vorhanden, wird auch nichts ausgegeben. So können null-Checks vermieden werden



#### Property-Binding

Property-Binding ist der Zugriff auf ein Attribut eines Element im Template.

```html
<img [property]="variableName"/>
```

Dabei kann ein Ergebnis einer Funktion, einer Variable oder sonstiges Element übergeben werden.

##### CSS-Klassen setzen

```html
<div [style.font-size.px]="calculateFontSize()">{{ Size }}</div>
```



#### Event-Binding

Durch Event-Binding wird auf Events von Komponenten reagiert. Diese werden dann direkt -inline- oder in der zuständigen Typescript-Datei abgearbeitet. Allgemein schaut das wie folgt aus:

```typescript
(eventName)="auszuführendes Statement"
```



Soll auf ein Klick eines Buttons reagiert werden, so erhält das Element den Event und die auszuführende Funktion:

```html
<button (click)="alert("Button wurde geklickt.")"></button>
```

Neben dem alert kann auch eine Funkton in der `app.component.ts` ausgeführt werden.



#### Two-Way-Data-Binding per ngModel-Direktive

Das Two-Way-Data-Binding ist eine Mischung aus Property- und Event-Binding. Durch eine Eingabe wird ein Change-Event ausgelöst.

```html
<input [(ngModel)]="var"/>
<input [(ngModel)]="var"/>
```

Das Element `<input>` kann durch das Two-Way-Binding über die Variable `var` belegt werden, in umgekehrter Form wird die Variable jedoch auch per Eingabe verändert.



Dabei muss jedoch die Direktive als Teil des FormsModule importiert werden. Im `@NgModule` muss daher folgende Anpassung vorgenommen werden:

```typescript
import { FormsModule } from '@angular/forms';
import: [BrowserModule, FormsModule]
```



#### Lakale Template-Variablen

Durch lokale Template-Variablen kann Zugriff auf das Element:

```html
<input #name/>
<button (click)="name.focus()">Minuten</button>
```

Durch den Klick wird in das Input-Feld mit dem Namen `name` gewechselt.



#### Input-Bindings

Komponenten können genutzt werden um Wiederverwendbarkeit herzustellen. Dazu zählt auch das Ergebnisse von Komponenten von außen abgefragt oder Inhalte von außen gesetzt werden können.



Die Übergabe erfolgt dann in der Aufnahme der Komponente:

```html
<app-tp [name]="'String'"></app-tp>
```

Um Inhalte von außen setzen zu können, muss in der Komponente ein Input-Decorator existieren:

```typescript
export class TPComponent {
	@Input() name: string;
}
```

Die Variable `name` muss korrekt angesprochen werden. Alternativ dazu kann auch ein Alias verwendet werden.

```typescript
export class TPComponent implements OnInit {
	@Input('aliasName') name: string;
}
```



#### Output-Binding

Das Output-Binding hingegen übergibt Daten von untergeordneten zu übergeordneten Komponenten. Oder kurz: Andere Komponenten über Datenänderungen informieren.

```typescript
export class TPComponent {
  @Output() changeEvent: EventEmitter<string>;
  constructor() {
		this.changeEvent = new EventEmitter<string>();
  }
  emitChange() {
		this.changeEvent.emit("newValue");
  }
}
```

Wie beim Input wird beim Output der `@Output`-Decorator genutzt. Der Event vom Typen EventEmitter nimmt einen String auf. Durch die Funktion `emit()` wird dann der Inhalt festgelegt. Dabei muss jedoch auch das Output importiert werden.

```html
<!-- Mutter-Komponente -->
<button (clicked)="variable = $event">Bitte Klicken</button>
```

Durch den Klick in der Kind-Komponente wird in dieser eine Funktion ausgeführt, die per EventEmitter und Output direkt in den Aufruf der Komponente in der Mutter-Komponente übertragen wird und dort als 'clicked' abgefangen werden kann.



Weiteres Beispiel:

```html
<!-- Kind -->
<input [(ngModel)]="kindValue" (change)="onChangeValue()">
```



```typescript
kindValue: number = 0
@Output() outputName = new EventEmitter()

onChangeValue() {
  this.outputName.emit(this.kindValue)
}
```

```html
<!-- Mutter-Komponente -->
<app-kind (outputName)="mutterValue = $event"></app-kind>
```

```typescript
mutterValue: number = 0
```

Wie gehabt muss in der `app.component.ts` das `FormsModule` importiert und aufgenommen werden.



#### Input- und Output-Binding

Neben dem separaten Input- und Output-Binding können diese auch ähnlich dem `[(ngModel)]` als Two-Way-Binding genutzt werden. So wird eine Veränderung jeweils zwischen Mutter- und Kind-Komponente zugespielt, abhängig vom Ursprung der Veränderung. Kurz: Wenn eine Veränderung durch die Kind-Komponente vorgenommen wird, so so wird dies an die Mutter-Komponente mit dem Output emitted. Erfolgt die Veränderung durch die Mutter-Komponente selbst, wird ähnlich dem Input-Binding die Kind-Kompoinente informiert.

```typescript
<!-- Mutter-Komponente -->
<div class="overlay" [ngClass]="{'active': isSidebarActive}" (click)="isSidebarActive = !isSidebarActive"></div>
<app-sidebar [(sidebarActive)]="isSidebarActive"></app-sidebar>
```

Durch einen Klick auf das `Overlay` wird die Variable `isSidebarActive` geändert. Anschließend wird per Two-Way-Binding die Kind-Komponente `sidebarActive` angestoßen.

```typescript
// Kind-Komponente
isActive = false
@Output() sidebarActiveChange: EventEmitter<boolean> = new EventEmitter<boolean>()
@Input() set sidebarActive(value: boolean) {
    this.isActive = value
}

toggle() {
    this.isActive = !this.isActive
    this.sidebarActiveChange.emit(this.isActive)
}
```

Das Input ist als Funktion aufgesetzt und verändert den Aktivitätsstatus `isActive`. Dies erfolgt bei jeder Veränderung von Außen. Die interne Funktion `toggle()` emitted hingegen eine Veränderung aus der Kind-Komponente heraus an die Mutter-Komponente.

<font style="color:red">Achtung:</font>

Die Bezeichner sidebarActive und sidebarActive<u>Change</u> sind bedacht benannt. Beide Kommunizieren mit `[(sidebarActive)]`.

#### HostBinding

Durch den Decorator `@HostBinding` kann auch eine Directive genutzt werden:

```html
<p appHighlightText>Hervorgehobener Text!</p>
```

```typescript
// directive.ts
export class DirectiveNameDirective {
  @HostBinding('style.backgroundColor') color = 'green'
}
```



#### HostListener

Soll auf das Element zugegriffen werden, auf dem das Directive sitzt, so nutzt man HostListener.

```typescript
@HostListener('mouseenter') mouseenter() {
  this.color = 'blue'
}

@HostListener('mouseleave') mouseleave() {
  this.color = 'red'
}
```

Darüber hinaus können die Farben auch als Variablen gesetzt werden.



#### Host-Binding und Host-Listener

```html
<h2>HostBindung und HostListener</h2>
<label for="email">Email: </label>
<br>
<input type="text" appLowerCase>
```

```typescript
import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appLowerCase]'
})

export class LowerCaseDirective {
  @HostBinding() value = 'Test';
  @HostListener('change', ['$event'])
  
  onChange($event) {
		this.value = $event.target.value.toLowerCase();
  }
}
```



#### Kanonisches Host-Binding

```typescript
@Directive({
  selector: '[appLowerCase]',
  host: {
		'(change)': 'onChange($event)',
		'[value]': 'value'
  }
})

export class LowerCaseCanonicalDirective {
  value = "";
  onChange($event) {
		this.value = $event.target.value.toLowerCase();
  }
}
```



### Templates

#### Ng-Content

Bei dem Content-Insertion wird einfacher HTML-Code in ein Template injiziert.

##### Content-Insertion

Es wird eine Komponente `panel` als Template erstellt. Mit dem Aufruf mittels Selector `<app-panel>` werden die benötigten Inhalte übergeben.

```html
<app-panel title="Das ist der Titel">
  Dies ist ein <i>Beispieltext</i>!
</app-panel>
```

Der Titel wird wie zuvor im Input-Bindings beschrieben gesetzt. Der Inhalt selbst wird als Body in den Selector geschrieben.

```typescript
@Component({
  selector: 'app-panel',
  template: `
  <div class="panel">
    <div class="header">
      <span>{{ title }}</span>
    </div>
    <div class="body">
      <ng-content></ng-content>
    </div>
  </div>
  `
[...]
export class PanelComponent {
	@Input() title: string;
  constructor() { }
}
```

Durch das `ng-content`-Tag wird der Body des aufrufenden Selectors an dieser Stelle eingefügt.

##### Mehrere Content-Insertions

```html
<app-panel title="Das ist der Titel">
  <app-panel-header>
    <span style="text-decoration: underline;">
      Das ist ein <i>gestylter Titel</i>
    </span>
  </app-panel-header>
  Dies ist ein <i>Beispieltext</i>!
</app-panel>
```

Mit dem Aufruf mittels Selector `<app-panel>` werden die benötigten Inhalte übergeben. Dazu zählen auch die `<app-panel-header>`.

```typescript
import { Directive } from '@angular/core';

@Directive({
  selector: 'app-panel-header'
})
export class PanelHeaderDirective {
  constructor() { }
}
```

Diese selbst wird als Tag-Directive erstellt.

```html
<div class="panel">
  <div class="header">
    <ng-content select="app-panel-header"></ng-content>
  </div>
  <div class="body">
    <ng-content></ng-content>
  </div>
</div>
```

Ähnlich wie im Bereich ng-content kann nun das `select="app-panel-header"`mit integriert werden.

```typescript
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelComponent, PanelHeaderDirective} from './panel.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PanelComponent, PanelHeaderDirective],
  exports: [PanelComponent, PanelHeaderDirective],
})
export class PanelModule {
}
```

Es ist sinnvoll die Komponente und die Directive in einem Modul zu bündeln.

##### Content Children

Neben dem ng-content können in einer Komponente auch andere Komponenten eingebunden werden.

<span style="color: red"><b>Content Children muss weiter bearbeitet werden.</b></span>



## 3. Direktiven: Komponenten ohne eigenes Template

Sollen Bestandteile lediglich um Verhalten erweitert werden, nutzt man Directives. Genutzt wird dabei ähnlich der Komponente (`@Component`) der `@Directive`-Decorator.

Es existieren zwei verschiedene Arten von Directives:

<b>1. Attribute Directives</b>

Diese interagieren mit dem Element, auf welches sie angewandt werden (Veränderung des CSS-Styles durch `ngStyle`).

<b>2. Structural Directives</b>

Die Structural Directives interagieren mit dem aktuellen ViewContainer und verändern den DOM/HTML Code (`*ngIf`, `*ngFor`).



#### Voraussetzung

Die Standard-Directiven können nach dem import des `CommonModule` genutzt werden. Dies geschiet im `@ngModule`:

```typescript
import { CommonModule } from '@angular/common';
@ngModule({
  import: [CommonModule],
  ...
})
```



#### Attribute Directives

##### Bsp. - Border-Directive per ElementRef

```html
<div chBorder="2">
	Ich habe einen Rahmen mit einer Breite von 2 Pixeln.
</div>
```

Das `chBorder`-Directive muss nun erstellt werden und den Wert übernehmen:

```typescript
import {ElementRef, Directive, Input} from '@angular/core';
@Directive({
selector: '[chBorder]', })
export class BorderDirective implements OnChanges {
  @Input() chBorder = 1;
	constructor(private elementRef: ElementRef) {
  }
  ngOnChanges() {
		const style = `solid ${this.chBorder}px`;
		this.elementRef.nativeElement.style.border = style;
  }
}
```

Der Selector kennzeichnet im `<div>` das Directive. Diesem "Attribut" wird ein Wert zugeordnet, so dass es selbst gleichzeitig als `@Input()` genutzt wird. Übergeben wird dabei die Stärke des Rahmens.

Durch eine Dependency-Injection wird dem constructor das ursprüngliche Objekt übernommen. Dieses wird dann in der  `ngOnChange()`-Funktion bearbeitet.



##### Bsp. - Warning Background per Renderer2

Auf anderen Plattformen als dem Browser führt ein direkter Zugriff auf die DOM-API zu Problemen. Dann nutzt man die Renderer2-Klasse.

```typescript
import {ElementRef, Renderer2, ...} from '@angular/core';

export class BorderDirective {
	@Input('chBorder') border = 1;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  ngOnChanges(change: any) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'border', `solid ${this.border}px`);
  }
}
```

Die Implementierung ist ähnlich wie im Beispiel voran. Der Zugriff erfolgt jedoch über die Renderer2-Klasse per `setStyle()`-Funktion.



##### Host-Binding

Host-Eigenschaften sind direkte Bestandteile des selektierten DOM-Elements. Beispielhaft kann hier die `LowerCase`-Directive genannt werden. Ein eingegebener Text kann hierbei nach der EIngabe einfach in "Kleinbuchstaben" umgewandelt werden.

```html
<label>E-Mail: </label>
<input type="text" appLowerCase/>
```

Zur Durchführung wird ein Zugriff auf DOM-Property und -Events des Input-Feldes benötigt.

```typescript
import {HostListener, HostBinding, Directive} from '@angular/core';

@Directive({
  selector: '[chLowerCase]'
})
export class LowerCaseDirective {
  @HostBinding() value = '';
  @HostListener('change', ['$event']) 
  	onChange($event) {
      this.value = $event.target.value.toLowerCase();
		}
}
```

In der Directive wird dann die `value`-Property des Eingabefeldes an die `value`-Membervariable der Directive gebunden. Der HostListener beinhaltet dann den auslösenden `change`-Event mit der auszuführenden `onChange`-Methode.



##### Kanonisches Host-Binding

```typescript
@Directive({
  selector: '[chLowerCase]',
  host: {
    '(change)': 'onChange($event)',
    '[value]': 'value'
  }
})
export class LowerCaseCanonicalDirective {
  value = "";
  onChange($event) {
    this.value = $event.target.value.toLowerCase();
  }
}
```

In der kanonischen Form werden HostBinding und -Listener direkt unterhalb des `selector` definiert. Die Membervariable als auch die Methode muss jedoch in der Klasse weiter existieren.



##### Zugriff auf Schnittstellen einer Directive

Soll in einer Directive ein Zugriff auf eine Schnittstelle erfolgen, so ist in dem genutzten HTML-Tag auch auf einen Export der Directive zu verweisen.

```html
<ch-panel-group chAccordion #firstAccordion="accordion">
  <ch-panel title="Abschnitt 1">...</ch-panel>
  <ch-panel title="Abschnitt 2">...</ch-panel>
  <ch-panel title="Abschnitt 3">...</ch-panel>
</ch-panel-group>
<button (click)="firstAccordion.closeAll()">Alle schließen</button>
```

Da eine Directive genutzt wird ist nicht wie in einer Komponente der in dem HTML-Template dies auszuführen.

In einer Directive wird ein `exportAs` gesetzt. So kann in dem nutzenden/übergeordneten Template einfach auf Methoden der Directive zugegriffen werden.

```typescript
@Directive({
  selector: 'ch-accordion',
  exportAs: 'accordion'
})
```

In der Art und weise kann auf die Verwendung von Komponenten verzichtet werden. Ein Verhalten wird per Directives gesteuert.

---



## 4. Fortgeschrittene Komponentenkonzepte

Es ist durchaus üblich Komponenten auszutauschen oder in ihrem Aussehen anzupassen. Dafür wird die Klasse `TemplateRef` genutzt.

Ab Seite 195.



### Change Detection Strategie

Der Change Detection Mechanismus bestimmt, wann bzw. wie oft eine Komponente auf Änderungen untersucht wird. Kommt es zu Veränderungen, müssen Komponenten geprüft und ggf. aktualisiert werden.

---



## 5. Template-driven Forms

In diesem Bereich werden 3 Konzepte verbunden: Formulare, Routing und Anbindung von HTTP-Backends. Diese können nur schwer einzeln behandelt und vorgestellt werden.

Formulare können als template-driven oder reaktive erstellt werden. Hier beschränken wir uns auf den template-driven Ansatz.

### Voraussetzungen

Zur Nutzung muss in der `app.module.ts` das `FormsModule` oder `ReactiveFormsModule` hinzugefügt werden.

### Input und Textarea - One-Way-Binding

In einem Form wird jeweils für ein Input und Textarea eine `form-group` -Klasse genutzt. Die Felder werden dann mit der Klasse `form-control` versehen.

```html
<form novalidate 
      (ngSubmit)="saveTask(form.value)" 
      #form="ngForm">
  <div class="form-group">
    <label for="title">Titel</label>
    <input type="text"
           class="form-control" 
           name="title" 
           ngModel 
           required>
  </div>
  <div class="form-group">
    <label for="description">Beschreibung</label>
    <textarea class="form-control" 
              name="description" 
              ngModel></textarea>
  </div>
  <button type="submit" 
          class="btn btn-default"
          [disabled]="!form.valid">
	Aufgabe speichern
  </button>
</form>
<pre>{{ task | json }}</pre>
```

Das Directive `ngForm` ist Teil der Forms-API.

Durch den Submit-Event wird die hinterlegte Methode `saveTask(value: any)` ausgeführt. Das `form.value` beinhaltet alle Form-Controls und ihrer Werte.

```typescript
task: any;

saveTask(value: any) {
    this.task = value;
}
```

Anschließen wird der Task nach der Eingabe im JSON-Form ausgegeben.



### Two-Way-Binding

Soll nun ein Two-Way-Binding zwischen der Eingabemaske und dem Code-Behind aufgebaut werden, so muss das jeweilige `ngModel` nun den Inhalt Binden.

```typescript
[(ngModel)]="task.title"
```

Durch einen Constructor kann vorweg eine Eingabe vorgegeben werden:

```html
constructor() {
    this.task = {
    	title: 'Erster Task',
    	description: 'Mit seiner ersten Beschreibung'
    }
}
```

Die Masken Titel und die Beschreibung werde so einfach vorab belegt. Jede Veränderung verändert jedoch auch augenblicklich die Variable Task, ohne durch die Taste "Aufgabe speichern" bestätigt zu werden.



### Zugriff auf das NgModel

Soll auf den Wert einzelner Elemente zugegriffen werden, kann die mit dem NgModel erfolgen:

```html
<input type="text" class="forl-control" name="title" [(ngModel)]="task.title" #title="ngModel" required />
<div *ngIf="!title.control.valid" class="allert alert-danger">
    Bitte geben Sie einen Titel an.
</div>
```

Der Zugriff erlaubt also die Eigenschaft des Control-Elements zu prüfen.



### Auswahllisten

Auswahllisten können erstellt und durch eine einfache `*ngFor`-Directive befüllt werden.

```html
<select class="form-control" name="state" [(ngModel)]="task.state">
  <option *ngFor="let state of states">
    {{ state }}
  </option>
</select>
```



Die mögliche Optionen werden durch die `*ngFor`-Directive aus Werten des Arrays befüllt.

```typescript
export const states = [
    'BACKLOG', 
    'IN_PROGRESS', 
    'TEST', 
    'COMPLETE'
];
```



#### Value-Bindung

Durch die Value-Bindung kann der ausgewählte Wert durch das `[(ngModel)]` übertragen werden.

```html
<select class="form-control" name="state" [(ngModel)]="task.state">
  <option value="">Bitte wählen Sie aus!</option>
  <option *ngFor="let state of model.states"
          [value]="state">
    {{ model.stateTexts[state] }}
  </option>
</select>
```

Das `[value]` wird durch `[(ngModel)]="task.state"` an `task.state` mittels Two-Way-Binding übergeben.



#### Select mit Gruppen

Durch Gruppen können Einzelwerte innerhalb eines Options-Feldes gruppiert werden.

```html
<select class="form-control" name="state" [(ngModel)]="task.state">
  <optgroup *ngFor="let group of model.stateGroups"
            [label]="group.label">
    <option *ngFor="let state of group.states" [value]="state">
      {{ model.stateTexts[state] }}
    </option>
  </optgroup>
</select>
```

Dazu müssen nun neben dem `states`-Array auch ein `stateGroups`-Array vorhanden sein:

```typescript
export const stateGroups = [
    { label: 'Planung', states: ['BACKLOG'] },
    { label: 'Entwicklung', states: ['IN_PROGRESS', 'TEST'] },
    { label: 'In Produktion', states: ['COMPLETE'] }
];
```

Durch ein weiteres Array kann dann auch noch der angezeigte Inhalt bearbeitet werden:

```typescript
export const stateTexts = {
    'BACKLOG': 'Backlog',
    'IN_PROGRESS': 'In Bearbeitung', 
    'TEST': 'Im Test', 
    'COMPLETE': 'Abgeschlossen'
};
```



#### Model

Durch die Verwendung eines `Model` können die Arrays als auch die Interfaces  in eine Datei `model-interfaces.ts` ausgelagert werden. Die Einbindung in die `*.ts` erfolgt dann:

```typ
import * as model from './model-interfaces';
[...]
model = model;
task: model.Task;
```

Alle Zugriffe auf die beschriebenen Arrays erhalten dann das Präfix `model.`.



### Checkboxes

Checkboxes sind nach dem vorherigen Teil einfach zu realisieren.

```html
<div class="checkbox">
    <label>
        <input type="checkbox" name="favorite" [(ngModel)]="task.favorite">
        Zu Favoriten hinzufügen
    </label>
</div>
```



### Radio-Buttons

```html
<div class="radio" *ngFor="let state of model.states">
    <label>
        <input type="radio" name="state" [(ngModel)]="task.state" [value]="state">
        {{ model.stateTexts[state] }}
    </label>
</div>
```



### Verschachtelte Eigenschaften

Verschachtelungen werden einfach per NgModelGroup ermöglicht.

```html
<div ngModelGroup="assignee">
    [...]
</div>
```

In diese Group können dann Elemente aufgenommen werden, die dann innerhalb des Task auch eine Gruppe bilden.

```html
<div ngModelGroup="assignee">
    <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" name="name" [(ngModel)]="task.assignee.name">
    </div>
    <div class="form-group">
        <label>E-Mail</label>
        <input type="text" class="form-control" name="email" [(ngModel)]="task.assignee.email">
    </div>
</div>
```

Durch das Two-Way-Binding werden Veränderungen wieder sofort in das Task übertragen.



#### Wiederholbare Strukturen

Wiederholungen können wie in vorangegangenen Beispielen u.A. durch `*ngFor` umgesetzt werden. Um auf einzelne Elemente zuzugreifen, nutzt man dann den Index.

```html
<div *ngFor="let tag of task.tags; let i = index">
  <input class="form-control" name="{{ i }}" [(ngModel)]="tag.label">
  <button class="btn btn-danger" (click)="removeTag(i)">
    Tag entfernen
  </button>
</div>
<div class="form-group">
  <button class="btn btn-danger" (click)="addTag()">
    +
  </button>
</div>
```

```typescript
addTag() {
  this.task.tag.push({label: ''});
}
removeTag(i: number) {
  this.task.tags.splice(i, 1);
}
```



#### UpdateOn - Änderungen steuern

Bislang werden bei jeder Veränderung (entfernen oder hinzufügen eines Buchstaben) die Änderungen sofort übernommen. Dies kann zu Performance-Problemen führen.

Es besteht die Möglichkeit, Veränderungen erst mit verlassen des Feldes zu übernehmen:

```html
<input type="text" [(ngModel)]="task.assignee.name" [(ngModelOptions)]="{updateOn: 'blur'}">
```

Neben einzelnen Elementen, kann auch ein gesamtes Formular so übernommen werden:

```html
<form (ngSubmit)="saveTask(form.value)" #form="ngForm" [ngFormOptions]="{updateOn:}'submit'">
  [...]
</form>
```



## 6. Reactive Forms

Der reactive-Ansatz unterscheidet sich zum template-Ansatz durch die drei folgenden Punkte:

- Die Formularlogik wird in Typescript/Javascript erzeigt.
- Im Html-Code wird lediglich das Formular mit der Verknüpfung zum Typescript definiert.
- Anstatt Two-Way-Binding wird die value-Eigenschaft jeder Eingabefläche genutzt.



### Voraussetzung

Zur Nutzung muss in der `app.module.ts` das `FormsModule` oder `ReactiveFormsModule` hinzugefügt werden.



### Verbindung von Formular und Logik

Zur Erstellung/Verbindung des Formulars und der Logik, muss ebenfalls im Typescript-Code folgende Module importiert werden:

```typescript
import {FormGroup, FormArray, FormControl} from '@angular/forms';
...
export class ReactiveFormComponent {
  taskForm: FormGroup;
  constructor() {
    this.taskForm = new FormGroup({ 
      title: new FormControl(''),
      description: new FormControl(''), 
      favorite: new FormControl(false), 
      state: new FormControl('BACKLOG'), 
      tags: new FormArray([
        new FormGroup({
          label: new FormControl('')
        })
      ]),
      assignee: new FormGroup({ 
        name: new FormControl(''), 
        email: new FormControl('')
      }),
    });
  }
}
```

```html
<form novalidate [formGroup]="taskForm" (ngSubmit)="saveTask(taskForm.value)">
  <div class="form-group">
    <label>Titel</label>
    <input class="form-control" formControlName="title"/>
  </div>
  ...
  <h4>Zuständiger</h4>
  <div formGroupName="assignee">
    <div class="form-group">
      <label>Name</label>
      <input type="text" class="form-control" formControlName="name"/>
    </div>
    <div class="form-group">
      <label>E-Mail</label>
      <input type="text" class="form-control" formControlName="email"/> </div>
  </div>
  ...
  <button type="submit" class="btn btn-default" [disabled]="!taskForm.valid">
    Aufgabe speichern
  </button>
</form>
```



### Allg. Erläuterung

```html
<form novalidate [formGroup]="taskForm">
  ...
</form>
```

Durch die `formGroup`-Directive mit dem Selector `[formGroup]="taskForm" ` wird die Verbindung von Formular und Logik erzeugt.

```typescript
constructor() {
  this.taskForm = new FormGroup({
    ...
  })
}
```

In diese erste FormGroup (HTML und TS) können dann weitere Elemente von `AbstractFormControl`-Objekten aufgenommen werden (`FormGroup`, `FormControl` oder `FormArray`).



### FormControl - Input und Textarea

```html
<form [formGroup]="taskForm">
  <div class="form-group">
    <label>Titel</label>
    <input class="form-control" formControlName="title"/>
  </div>
</form>
```

Die Verbindung von `FormControl`-Elementen erfolgt durch die Directive `formControlName="title"`. 

```typescript
this.taskForm = new FormGroup({
  title: new FormControl('Titel')
}
```

`'Titel'` entspricht dabei dem Defaultwert, der an das Formular übergeben wird. Ähnlich verhält es sich mit dem Textarea.



### Weitere FormGroup

Durch weitere FormGroups können Formular und Daten strukturiert werden.

```html
<div formGroupName="assignee">
  <div class="form-group">
    <label>Name</label>
    <input type="text" class="form-control" formControlName="name"/>
  </div>
</div>
```

Die Verbindung von weiteren `FormGroup`-Elementen erfolgt durch die Directive `formGroupName="assignee"`.

```typescript
this.taskForm = new FormGroup({
  ...
  assignee: new FormGroup({
    name: new FormControl(''),
    email: new FormControl('')
  })
});
```

Die `FormGroup` kann dann wiederum Elemente von `AbstractFormControl`-Objekten aufnehmen (`FormGroup`, `FormControl` oder `FormArray`).



### FormArray - Wiederholbare Strukturen

```html
<label>Tags</label>
<div formArrayName="tags">
  <div *ngFor="let tag of tagsArray.controls; let i = index">
    <div class="tag-controls" formGroupName="{{i}}">
      <input class="form-control" formControlName="label">
      <button class="btn btn-danger" (click)="removeTag(i)">
        Tag entfernen
      </button>
    </div>
  </div>
</div>
<div class="form-group">
  <button class="btn btn-success" (click)="addTag()"> + </button>
</div>
```

Die Verbindung von  `FormArray`-Elementen erfolgt durch die Directive `formArrayName="tags"`. Innerhalb des `FormArrayName` wird dann durch die `Control`-Elemente iteriert. Über den Index werden die einzelnen Einträge identifiziert.

```typescript
tagsArray: FormArray;
constructor() {
  this.taskForm = new FormGroup({ 
    ...
    tags: new FormArray([
      new FormGroup({
        label: new FormControl('')
      })
    ])
  });
  this.tagsArray = <FormArray>this.taskForm.controls['tags'];
}
```

Ein `FormArray` wird zunächst in der Variable `tagsArray` zwischengespeichert.

Das `FormArray` kann dann wiederum Elemente von `AbstractFormControl`-Objekten aufnehmen (`FormGroup`, `FormControl` oder `FormArray`).

#### Hinzufügen von Elementen

Durch einen Button soll per `(click)="addTag()"` ein Element oder eine Gruppe hinzugefügt werden.

```typescript
addTag() {
  this.tagsArray.push(this.createTagControl());
  return false;
}

private createTagControl(): FormGroup {
  return new FormGroup({
		label: new FormControl('')
  });
}
```

Das `return false;` verhindert ein absenden des Formulars durch den jeweiligen Button.

#### Entfernen von Elementen

```typescript
removeTag(i: number) {
this.tagsArray.removeAt(i);
  return false;
}
```

#### Einfügen von Elementen

Durch `insert(index, control)` kann ein Element auch an eine bestimmte Stelle in ein `FormArray`eingefügt werden.



### Befüllen des Formulars mit Daten

Durch `setValue` und `patchValue` bietet die Forms-API einfache Methoden das Formular mit Daten zu bespielen.

`setValue` gibt jedoch einen Fehler zurück, wenn das Formular nicht alle Daten aufnehmen kann, weil ggf. ein Kontrollelement fehlt (id). Es bitet sich dabei die Methode `patchValue` an. Die id der Daten muss somit nicht an das Formular übergeben werden, bleibt im Hintergrund jedoch erhalten.

```typescript
loadTask(id: number) {
	this.task = this.taskService.getTask(id);
  this.taskForm.patchValue(this.task);
  return false;
}
```

Das laden und speichern von Tasks sollte in einen Service ausgelagert und von der Logik getrennt werden.

<font style="color:red">Achtung:</font>

Bis zu diesem Zeitpunkt ist nicht bekannt, wieviele Elemente ein FormArray besitzt. Durch eine `adjustTagsArray`-Methode werden vorher alle benötigten Elemente generiert um die Daten aufzunehmen.

```typescript
loadTask(id: number) {
  this.task = this.taskService.getTask(id);
  this.adjustTagsArray(this.task.tags);
  this.taskForm.patchValue(this.task);
  return false;
}
private adjustTagsArray(tags: any[]) {
  const tagCount = tags ? tags.length : 0;
  while (tagCount > this.tagsArray.controls.length) {
    this.addTag();
  }
  while (tagCount < this.tagsArray.controls.length) {
    this.removeTag(0);
  }
}
```



### Speichern der Daten

```typescript
saveTask(value: any) {
  Object.assign(this.task, value);
  this.taskService.saveTask(this.task);
}
```



### Formbuilder

#### Voraussetzung

```typescript
import { FormBuilder, ...} from '@angular/forms';
```



#### Implementierung

```typescript
constructor(fb: FormBuilder) {
  this.taskForm = fb.group({
    title: [''],
    description: [''],
    favorite: [''],
    state: ['BACKLOG'],
    tags: fb.array([ 
      fb.group({
        label: ['']
      })
    ]),
    assignee: fb.group({
      name: [''],
      email: [''], })
  });
}
```

Der Formbuilder vereinfacht die Umsetzung der Logik und beinhaltet lediglich noch die `group`- und `array`-Methode (als `FormGroup` und `FormArray`).



#### Validierung

Siehe S. 367



### UpdateOn

Die UpdateOn-Methode bei Reactive Forms erfolgt ähnlich der Aufnahme von Validators bei der Erstellung des `FormControl`-Element oder im jeweiligen Array der Formbuilder-Eigenschaft.

```typescript
// Reactive Form
name: new FormControl('', {
  asyncValidators: this.userExistsValidatorReused,
  updateOn: 'blur'
})

// Formbuilder
this.taskForm = new FormGroup(this.taskForm.controls, {
  validators: this.taskForm.validator,
  updateOn: 'blur'
});
```



### Kontrollelemente auf Änderungen überwachen

```typescript
this.taskForm.valueChanges.subscribe((value) => {
  Object.assign(this.task, value);
});
```



### Formular dynamisch definieren

```json
{
  id: '1',
  question: 'Seit wann entwickeln Sie bereits Software?',
  type: 'TEXT',
  required: true
}, {
  id: '2',
  question: 'Bitte beschreiben Sie Ihr letztes Angular-Projekt',
  type: 'LONGTEXT'
}
```

```typescript
export class GeneratedFormComponent implements OnInit {
  questionsForm: FormGroup;
  questions: Question[];
  constructor(private questionService: QuestionsService) {
    this.questionsForm = new FormGroup({});
  }
  ngOnInit() {
    this.questions = this.questionService.loadQuestions();
    for (const question of this.questions) {
      const formControl = this.createControl(question);
      this.questionsForm.addControl(question.id, formControl);
    }
  }
  private createControl(question: Question): FormControl {
    const validators = [];
    if (question.required) {
      validators.push(Validators.required);
    }
    return new FormControl('', validators);
  }
}
```

```html
<form novalidate [formGroup]="questionsForm" (ngSubmit)="saveForm(questionsForm.value)">
  <div *ngFor="let question of questions">
    <div class="form-group" [ngSwitch]="question.type">
      <label>{{question.question}}
      	<span *ngIf="question.required"> *</span>
      </label>
      <div *ngSwitchCase="'TEXT'">
        <input type="text" class="form-control" [formControlName]="question.id"/>
      </div>
      <div *ngSwitchCase="'LONGTEXT'">
        <textarea class="form-control" [formControlName]="question.id">
        </textarea>
      </div>
      <div *ngSwitchCase="'CHOICE'">
        <select class="form-control" [formControlName]="question.id">
          <option> --- Bitte wählen ---</option>
          <option *ngFor="let choice of question.choices">{{choice}}</option>
        </select>
      </div>
      <pjm-show-error [path]="question.id"></pjm-show-error>
    </div>
  </div>
  <button type="submit" class="btn btn-default"
          [disabled]="!questionsForm.valid"> Antworten absenden
  </button>
</form>
```

Ausgabe der Antworten:

```typescript
showSummary = false; 
saveForm(formValue: any) {
  this.questionService.saveAnswers(formValue);
  this.answerSummary = this.questions.map(question => {
    return {
      text: question.text,
      answer: formValue[question.id]
    };
  });
  this.showSummary = true;
}
backToForm() {
	this.showSummary = false; this.questionsForm.reset({});
}
```

in der gleichen Form:

```html
<div *ngIf="showSummary">
  <p class="bg-success">
    Vielen Dank für die Beantwortung unseres Fragebogens.
    Hier ist noch mal eine Zusammenfassung Ihrer Antworten:
  </p>
  <div *ngFor="let answer of answerSummary" class="answer">
    <label>{{answer.text}}</label>
    <span>{{answer.answer}}</span>
  </div>
  <button class="btn btn-default" (click)="backToForm()">
    Zurück zur Eingabe
  </button>
</div>
```



### Neue Eingabeelemente entwickeln

Sollen neue Eingabeelemente estellt werden erfolgt dies per `ControlValueAccessor`. Soll nun in einem Form ein neues Element genutzt werden, ist dieses als Komponente zu erstellen:

```html
<form [formGroup]="testform">
  <app-custom-input type="email" label="Mail" formControlName="email"></app-custom-input>
  <app-custom-input type="text" label="Name" formControlName="fullname"></app-custom-input>
  <app-custom-input type="text" label="Phone" formControlName="phone"></app-custom-input>
</form>
<pre>{{ testform.value | json }}</pre>
```

Abgesehen vom Tag enthält diese Input-Komponente die für ein Input-Feld relevanten Parameter.

Durch die Nutzung des FormBuilders enthält die zugehörige `.ts`:

```typescript
	testform: FormGroup;

  constructor(fb: FormBuilder) {
    this.testform = fb.group({
      email: [''],
      fullname: ['Bill Gates'],
      phone: [{
        value: '0497 88 88 88',
        disabled: false
      }, { updateOn: 'blur' }]
    });
  }
```

Durch den `formControlName` erhält jede Eingabekomponente eine hinterlegte Value.



Die neu erstellte Komponente erhält Label- und Input-Feld. Die enthaltenen Properties sind im Code hinterlegt und werden als `@Input()`aufgenommen.

```typescript
import { Component, Input, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  template: `
    <label>{{ label }}</label>
    <input [type]="type"
      [placeholder]="placeholder"
      [value]="value"
      [disabled]="disabled"
      (input)="onChange($event.target.value)"
      (blur)="onTouched()" />
    <br>
  `,
  styles: [``]
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() disabled: boolean;
  @Input() label: string;
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';

  value: any = '';

  constructor( @Self() @Optional() private ngControl: NgControl ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: any): void {
    this.value = value;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // tslint:disable-next-line: typedef
  onChange(value: any) {}
  // tslint:disable-next-line:typedef
  onTouched() {}
}

```

Durch das Interface `ControlValueAccessor` sind die hinterlegten Methoden vordefiniert.

### Schnittstellen der `AbstractControl` in der Forms-API

Siehe S. 390



## 7. Routing



### Grundlage

Sind mehrere Komponenten vorhanden, kann zwischen diesen per Routing gewechselt werden. Dies kann auch als verlinken verstanden werden.

Wurde der Router nicht mit der Erstellung der Anwendung mit installiert, kann dieser nachinstalliert werden:

```terminal
npm new --routing
```



### Projekt-Struktur

#### Aufbau

```terminal
Projekt
├── documentation
└── src
    ├── app
  	│	├── modules		---auch Unterteilung nach weiteren Modulen---
  	│	│	├── components
  	│ 	├── layouts
  	│ 	├── pages
  	│ 	├── modules-routing.module.ts
  	│ 	└── modules.module.ts
  	│	│
  	│	├── core
  	│	│	├── authentication
  	│	│	├── footer
  	│	│	├── guards
  	│	│	├── models
  	│	│	├── navbar
  	│	│	├── services
  	│	│	├── sidebar
  	│	│	└── core.module.ts
  	│	│
  	│	├── config
  	│	│
  	│	├── shared
  	│	│	├── components
  	│	│	├── directives
  	│	│	├── pipes
  	│	│	├── validators
  	│	│	└── shared.module.ts
  	│	│
  	│	├── app-routing.module.ts
  	│	├── app.component.ts
  	│	└── app.module.ts
  	│
  	└── assets
    	└── styles.sass
```

#### Erstellung

| Befehl                                      | Beschreibung                              |
| ------------------------------------------- | ----------------------------------------- |
| `mkdir 'name'`                              | Erstellen eines Ordners                   |
| `ng g m 'name'` , `ng g m 'name' --routing` | Erstellen eines Modules mit einem Router  |
| `ng g c 'name' --dry-run`                   | Anzeige von Veränderungen ohne Erstellung |

Nachdem der Ordner `modules` inkl. `module` und `routing` erstellt wurde können die Pages/Components `home` und `user` hinzugefügt werden.

Automatisch wird in die Datei `modules.module.ts` die Components hinterlegt.

Die `modules.module.ts` muss nun noch in die `app.module.ts` importiert werden.



### PathLocation

Die Pathlocation-Strategie ist die schöne Ausgabe formatierter URLs. In Angular besteht jedoch eine SPA Single-Page-Application aus einer Seite, bei der nur Bestandteile aktualisiert werden. Angular bedient sich der History-API.

Werden auf einem Server mehrere Anwendungen betrieben und die eine Anwendung unter:

`http://meine-seite.de/project-manager/` erreichbar sein, so muss die `app-module.ts` angepasst werden:

```html
<title>Routing</title>
<base href="/"> <!-- PathLocation Strategie -->
```

```typescript
import { APP_BASE_HREF } from '@angular/common';

providers: [
  { provide: APP_BASE_HREF, useValue: '/project-manager/' }
]
```



### Routes allgemein

#### app-routing.module.ts

```typescript
import { Routes } from '@angular/router';
import { HomeComponent } from './modules/pages/home/home.component';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }
];
```

In der `app-routing.module.ts` werden die Routes gespeichert und exportiert.

#### app.module.ts

```typescript
// Routing
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    ModulesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Die `APP_ROUTES` können nach dem Import einfach durch das RouterModule genutzt werden. Es ist darauf zu achten, dass die in den Routes genutzten Components auch im `@NgModule` angemeldet werden. Dies passiert in der `ModulesModule`.



#### Startseite

Um nun der Anwendung eine Startseite (nicht die 'app.component.html') zuzuweisen, muss die 'app.component.html' lediglich folgende Zeilen enthalten:

```html
<router-outlet></router-outlet>
```

Anschließend wird die in der 'app.component.ts' -> 'app.module.ts' hinterlegte `appRoutes` aufgerufen. Darauf wird durch `redirectTo` auf die Startseite verwiesen.



### Routes erstellen

#### app-routing.module.ts

```typescript
import { Routes, RouterModule } from '@angular/router';

// Komponente auf die verlinkt wird
import { UserComponent } from './layouts/user/user.component';
import { AdminComponent } from './layouts/admin/admin.component';

// Array mit möglichen Routes
const routes: Routes = [
  { path: '', component: UserComponent }        //localhost:4200/
  { path: 'admin', component: AdminComponent }  //localhost:4200/admin
  { path: 'admin/details', component: AdminDetailsComponent }  //localhost:4200/admin/details
{ path: 'admin/:id', component: AdminComponent }  //localhost:4200/admin/10
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
```

#### app.module.ts

Komponenten auf die verlinkt wird, müssen auch im `app.module.ts` importiert und **declariert** werden. Darüber hinaus muss das AppRoutingModule aus der `app-routing.module.ts` und im '@NgModule' importiert werden.

#### app.component.html

Um nun noch anzugeben in welchen Bereich die Verlinkung angezeigt werden soll, wird in der `app.component.html` die Directive / der Tag `<routing-outlet>` hinterlegt.



### Navigation

#### HTML-Link

Allgemein werden Links per `<a href="">Link</a>` gesetzt. Dabei wird eine neue Request an den Server gesandt. Damit wird der State der Seite jedoch zurückgesetzt.

```html
<span>
  <a href="">Home</a>
</span>
<span>
  <a href="/admin">Admin</a>
</span>
<router-outlet></router-outlet>
```

#### Angular routerLink

Soll der State der Seite bestehen bleiben, sind Angular routerLinks zu nutzen. Beschriebene Felder bleiben dabei erhalten. Der Property routerLink wird dabei ein Array übergeben, welches die Untergliederung enthält. Diese Gliederung/Untergliederung muss in der `app-routing.module.ts` auch als Pfad angegeben werden.

```html
<a [routerLink]="['/']">Home</a>        <!--localhost:4200/-->
<a [routerLink]="['/admin']">Admin</a>  <!--localhost:4200/admin-->
<a [routerLink]="['/admin', '/details']">Admindetails</a> <!--localhost:4200/admin/details-->
<router-outlet></router-outlet>
```

#### Child Router

Sollen mehrere verschachtelte Routerlinks gebildet werden, so kann man Routes mit Children erstellen. In einer Componente mit mehreren Unterkomponenten kann dann ein eigenes RouterModule erstellt werden. Dieses beinhaltet dann die Grundlegende Route und alle Child-Routes:

```typescript
const dashboardroutes: Routes = [
  { path: 'dashboard', component: DashboardComponent,
   children: [
     { path: 'dash', component: DashComponent },
     { path: 'management', component: ManagementComponent },
     { path: 'cloud', component: CloudComponent },
     { path: '', redirectTo: 'dash', pathMatch: 'full' }
   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardroutes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
```

Das DashboardRoutingModule kann dann einfach wie das RouterModule in der `app.module.ts` importiert werden.

Die Route zum eigentlichen Dashboard aus der ursprünglichen Route gelöscht werden. Die Routerlinks werden dann im Dashboard neu gesetzt:

```html
<a [routerLink]="['/dashboard', 'management']">Management</a>
<a [routerLink]="['/dashboard', 'cloud']">Cloud</a>
```





### Programmatisch navigieren

#### Einfaches Routing

Soll alternativ zu einem Link programatisch durch Funktionen navigiert werden, muss in der zugehörigen `.ts`-Datei der Router importiert und im Constructor injected werden. Anschließend kann eine Funktion ausgeführt oder durchlaufen werden, in der die Funktion `this.router.navigate()` ausgeführt wird, der ebenfalls ein Array mit dem Pfad übergeben wird.

```typescript
import { Routes } from '@angular/router';

constructor(private router: Router) { }

onNavigate() {
  this.router.navigate(['/user'])
}
```

Der genutzte Pfad muss in der `app-routing.module.ts` hinterlegt sein.

#### Routingparameter

Das einfache Routing kann durch Parameter erweitert werden. Beispielhaft soll dies hier durch eine ID demonstriert werden. Zur Nutzung muss der Pfad in der `app-routing.module.ts` angepasst werden: 

```typescript
{ path: '/user/:id', component: UserComponent }
```

Anschließend kann der Link angepasst werden.

```typescript
<a [routerLink]="['/user', input.value]"></a>
<input type="text" #input (input)="0" />
```

Nach Eingabe einer Nummer 10 wird der Link '/user/10' aufgerufen. Die '/user' Route selbst muss, wenn sie weiter genutzt werden soll, auch als Pfad neu angegeben werden.

#### Routingparameter extrahieren

Der Router ist für die aktuelle Route zuständig. Um nun darauf aufbauend, Zugriff auf Parameter zu erhalten, wird die `ActivatedRoute` importiert und durch die gg. Funktionen bedient:

```typescript
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

export class UserComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  id: string;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }    

  ngOnInit() {
    //this.id = this.activatedRoute.snapshot.params['id']
    this.subscription = this.activatedRoute.params.subscribe(
      (params: Params) => this.id = params['id']
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();    // Kein overload
  }
}
```

Durch Subscription werden die Parameter gespeichert. Das gilt auch beim verlassen der Seite. Nach Benutzung ist Subscription somit wieder zu löschen.

#### Optionale Routingparameter

Sollen Optionale Parameter wie `user/12/?token=1234` verwendet werden können diese wie folgt implementiert werden:

```typescript
onNavigate() {
  this.router.navigate(['/user'], {queryParams: {'token': 1234}}) // absoluter Pfad
}
```

```typescript
import { Router, ActivatedRoute, Params } from '@angular/router';
//...
token: string;
constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

ngOnInit() {
  //this.token = this.activatedRoute.snapshot.queryParams['token'];
  this.subscription = this.activatedRoute.queryParams.subscribe(
    (params: Params) => this.token = queryParams['token'];
  )
}

ngOnDestroy() {
  this.subscription.unsubscribe();    // Kein overload
}
```

#### Links und queryParameter

```html
<a [routerLink]="['/']" [queryParams]="{'token': 4321}">Home</a>	<!--localhost:4200/?token=4321-->
```

#### Fragment

Ähnlich den Parametern können Fragmente übergeben werden. Bei diesen handelt es sich um Sections oder Ankerpunkte wie `www.seite.de#about` mit dem Fragment `#about`.

```typescript
onNavigate() {
  this.router.navigate(['/user'], {fragment: {'anchor1'}}) // absoluter Pfad
}
```

```typescript
this.subscription = this.activatedRoute.fragment.subscribe(
  fragment => this.fragment = fragment
)
```



### Child-Routing

Eine Route besteht aus einer Kette. Nach den einfachen Routes soll hier diese Kette erweitert werden. Es wurden bereits Komponenten erstellt in die navigiert wurde. In diesen kann weiter navigiert werden. 

#### Ein neuer Pfad

Es ist an dieser Stelle erneut sinnvoll eine `routing.module.ts`-Datei anzulegen, um diese Seiten mit aufzunehmen.

```typescript
import { Routes, RouterModule } from "@angular/router";

import { UserEditComponent } from './user-edit.component'
import { UserDetailComponent } from './user-detail.component'

const USER_ROUTES: Routes = [
  { path: 'edit', component: UserEditComponent },
  { path: 'detail', component: UserDetailComponent }
]
```

In dieser befinden sich somit nur die weiterführenden Pfade des User. Dies muss in die allegemein Gültige Route mit aufgenommen werden, die sich i.d.R. unter `app-routing.module.ts` befindet.

#### Pfad des User erweitern

Der Pfad der zum User führt muss um den neuen Pfad erweitert werden:

```typescript
{ path: 'user', component: UserComponent, children: USER_ROUTES },
```

#### Komponente ausgeben

Die Komponente, die sich hinter dem Pfad befindet, wird in dem Tag `<router-outlet></router-outlet>` angezeigt. Dieser Tag  muss in dem Fall unter `UserComponent` befinden.

Sind alle Punkte erfüllt, kann durch die Adresszeile der Pfad vollständig angegeben und geöffnet werden.

Ebenfalls kann unt er der UserComponent dann der Link auf den Pfad gesetzt werden:

```html
<a [routerLink]="['edit']">Edit</a>
<a [routerLink]="['detail']">Details</a>
```

Da wir nich an den Localhost direkt ankoppeln, ist der Link ohne Backslash ("/")!

#### Weiterleitung

Für Gewöhnlich soll mit dem Öffnen der Seite ja eine ausgewählte Komponente angezeigt werden. Mit der Eingabe der URL als www.url.de wird die Grundseite geladen, jedoch keine verschachtelte Route. Dies erfolgt durch folgenden Ausdruck:

```typescript
{ path: '', redirectTo: 'user', pathMatch: 'full' },
```

Wird somit keine Standardkomponente geladen, kann über den Pfad einfach auf eine weitergeleitet werden.

Eine besondere Weiterleitung ist auch die Wildcard-Weiterleitung. Hierbei werden alle unbekannten Pfade einfach an einen Pfad weitergeleitet:

```typescript
{ pfad: '**', redirectTo: '/'} // absoluter Pfad
```

#### Aktive Route anzeigen

Der Router kann auch eine aktive Route in Verbindung mit CSS anzeigen. Dazu muss eine CSS-Klasse existieren, die an der aktiven Route angebunden wird:

```css
.activ {
  color: red;
}
```

Es kann einfach diese CSS-Klasse an ein Element angehängt werden oder dies erledigt der Router:

```html
<a [routerLink]="['/user']" routerLinkActive="active">User</a>
```

Ist die aktuelle Route über '/user' aktiv, so wird der Link rot angezeigt. Dabei wird jedoch nur der Ausschnitt '/user' gesucht.

Soll nach genau einem Ausschnitt gesucht werden, so muss dies angepasst werden:

```html
<a [routerLink]="['/user']" routerLinkActive="active"
   [routerLinkActiveOptions]="{exact: true}">User</a>
```

#### Routes schützen

Guards werden erstellt, um ein Zugruff oder Verlassen einer Route mit einer Logik zu versehen. Dazu wird eine neue Datei ggf. mit dem Namen `user-detail.guard.ts` erstellt. 

###### CanActivate-Guard

Durch den CanActivate-Guard kann der Zugriff auf eine Route erfragt werden ("Bist du dir sicher"):

```typescript
import { CanActivate } from '@angular/router'
import { Observable } from 'rxjs';

export class UserDetailGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 		Observable<boolean> | boolean {
    return confirm('Bist du dir sicher?');
  }
}
```

wirt `true` zurückgegeben, so wird der Zugriff erlaubt.

In der `user.route.ts` muss der Guard in den Pfad mit aufgenommen und somit auch importiert werden:

```typescript
import { UserDetailGuard } from './user-detail.guard.ts';
//...
{ path: "detail", component: UserDetailComponent, canActivate: [UserDetailGuard] }
```

Angular muss den Guard auch "enjekten", dazu muss UserDetailGuard in der `app.module.to` unter provider aufgenommen werden:

```typescript
providers: [UserDetailGuard],
```

###### CanDeactivate-Guard

Soll ein Verlassen gesichert werden, wird ein CanDeactivate-Guard genutzt.

```typescript
import { CanDeactivate } from '@angular/router'
import { Observable } from 'rxjs';

export class UserDetailGuard implements CanDeactivate {
  canDeactivate(component: any): Observable<boolean> | boolean {
    return true;
  }
}
```

Es ist besser ein Interface anzulegen, das die Komponente importiert. Dann bestitz die Komponente selbst die Funktion und kann die Logik vorgeben. Dazu kann im Guard das Interface erstellt und von der Componente implementiert werden:

```typescript
import { CanDeactivate } from '@angular/router'
import { Observable } from 'rxjs';

export interface ComponentCanDeactivate {
  canDeactivate: () => Observable<boolean> | boolean;
}

export class UserDetailGuard implements CanDeactivate {
  canDeactivate(component: ComponentCanDeactivate): Observable<boolean> | boolean {
    return component.canDeactivate();
  }
}
```

```typescript
export class UserEditComponent implements ComponentCanDeactivate {
  saved: boolean = false;
  onSave() {
    this.saved = true;
  }
  canDeactivate() {
    return this.saved;
  }
}
```

Zuletzt muss noch in der `user.route.ts` der Guard in den Pfad mit aufgenommen und somit auch importiert werden:

```typescript
import { UserEditGuard } from './user-detail.guard.ts';
//...
{ path: "detail", component: UserEditComponent, canDeactivate: [UserEditGuard] }
```

Wie im canActivate muss der Guard in der `app.module.to` unter provider aufgenommen werden:

```typescript
providers: [UserEditGuard],
```



## 8. Http

### API



### Proxy-Server

#### Allgemein

Sollte es bei der Nutzung von API zu Problemen kommen, kann dies zuteils durch einen Proxy umgangen werden.

Zur Nutzung eines Proxy ist keine Installation erforderlich.

#### Implementierung

Zur Verwendung des Proxy muss bei Start des Servers die Proxy-Config übergeben werden. Das kann automatisiert werden. Dazu ist in der `package.json`-Datei das Startscript anzupassen:

```json
"scripts": {
  "start": "ng serve --proxy-config ./src/proxy.conf.json"
}
```

Die Konfigurationsdatei `proxy.conf.json` wird im `/src/` hinterlegt und hat folgenden Inhalt:

```json
{
  "/api/*": {
    "target": "http://localhost:3000",
    "secure": false
  }
}
```

#### Beispiel - Wetterdaten

Erstellt werden soll eine Applikation, die je nach Parameter Örtlichkeit das Wetter online per API abruft und zur Verfügung stellt.

Nach dem Erstellen ser Applikation selbst, kann einfach die `proxy.conf.json` wie oben genannt erstellt werden.

```html
<!-- app.component.html-->
<pre>{{ weather | json }}</pre>
```

```typescript
/* app.component.ts */
import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  weather: any;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api
      .getWeather('Berlin')
      .subscribe(data => this.weather = data);
  }
}
```

```typescript
/* api.service.ts */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getWeather(location: string) {
    return this.http.get(
      'http://api.weatherstack.com/current?access_key=07b8458e84feca36c5be4f20321e5756&query=' + location
    );
  }
}
```

Zuletzt muss noch in der `app.module.ts` das `HttpClientModule` importiert werden.



### Observables

#### Subscribe()

Durch `this.params.subscribe()` werden Veränderungen festgestellt. Es können drei Funktionen an subscribe() übergeben werden:

```typescript
this.params.subscribe(
  data => console.log(data),          // Daten
  error => console.log(error),        // Fehlermeldungen
  () => console.log("Done")
)
```

---



## Klassen und Interfaces

### Interfaces

Interfaces sind gegenüber Klassen leichtgewichtiger und im Rahmen der Sicherstellung der Typsicherheit einfacher in ihrer Verwendung. Doch sie besitzen keine Möglichkeit Werte durch einen Constructor vor zu initialisieren.

```typescript
export interface Tag {
    label?: string;
}
export interface User {
    name?: string;
    email?: string;
}
export interface Task {
    id?: number;
    title: string;
    description?: string;
    tags?: Tag[];
    favorite?: boolean;
    state?: string;
    assignee?: User;
}
```

