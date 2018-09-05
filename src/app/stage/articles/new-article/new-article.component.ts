import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MessageService } from '../../../message.service';
import { Message } from '../../../message';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {

  @Input() isOpen: boolean;
  @Output() close: EventEmitter<void> = new EventEmitter();

  infoGroup: FormGroup;
  error: string;
  key: string;

  constructor(private messageService: MessageService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.error = '';
    this.infoGroup = this.formBuilder.group({
      title : ['', Validators.required, this.checkForKey.bind(this)],
      description : ['', Validators.required]
    });
  }

  checkForKey(control: AbstractControl) {
    const keyMsg = new Message('com.blink.shared.admin.article.ArticleKeyCheckRequestMessage');
    this.key = this.getKey(control.value);
    keyMsg.set('key', this.key);
    return this.messageService.send(keyMsg).pipe(map(result => {
      return result.isOK() && result.get('available') ? null : {available: false};
    }));
  }

  onCreateArticle() {
    this.error = '';
    if (this.infoGroup.valid) {
      const req = new Message('com.blink.shared.admin.article.CreateArticleRequestMessage');
      req.set('key', this.key);
      req.set('title', this.infoGroup.get('title').value);
      req.set('description', this.infoGroup.get('description').value);

      this.messageService.send(req).subscribe(result => {
        if (result.isOK()) {
          this.closeModal();
        } else {
          this.error = 'Connection Error';
        }
      });

    } else {
      this.error = 'Form Not Valid';
    }
  }

  private getKey(title: string): string {
    return title.replace(new RegExp(' ', 'g'), '-').replace(new RegExp('\'', 'g'), '').toLowerCase();
  }

  closeModal() {
    this.infoGroup.reset();
    this.close.emit();
  }

}
