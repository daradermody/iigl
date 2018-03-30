import {Component, OnInit} from '@angular/core';
import {DocumentService} from '../../services/document.service';
import {NotificationService} from '../../services/notification.service';
import {ActivatedRoute} from '@angular/router';

interface Document {
  name: string;
  link: string;
  html: string;
}

@Component({
  selector: 'app-legal-documents',
  templateUrl: './legal-documents.component.html',
  styleUrls: ['./legal-documents.component.css']
})
export class LegalDocumentsComponent implements OnInit {

  selectedDoc: Document;
  docs: Array<Document> = [
    {
      name: 'Code of Conduct',
      link: 'assets/docs/code_of_conduct.md',
      html: null
    }
  ];

  constructor(private documentService: DocumentService,
              private notifier: NotificationService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedDoc = this.docs.find(doc => doc.name === params['docName']);
      this.updateDocContent(this.selectedDoc);
    });
  }

  updateDocContent(doc: Document) {
    if (!doc.html) {
      this.documentService.getDoc(doc.link).subscribe(
        html => doc.html = html,
        error => this.notifier.emitError(error.message)
      );
    }
  }
}
