import {AfterViewChecked, Component, ElementRef, OnInit, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {DiagnosticsService} from '../../../services/diagnostics.service';
import * as Convert from 'ansi-to-html';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit, AfterViewChecked {
  @ViewChild('info') info: ElementRef;
  @ViewChild('error') error: ElementRef;

  converter = new Convert({newline: true});
  logs = {info: '', error: ''};

  constructor(private diagnosticsService: DiagnosticsService) {}

  ngOnInit() {
    this.diagnosticsService.getLogs().subscribe(
      (logs) => this.logs = {
          info: logs.info,
          error: logs.error
        }
    );
  }

  ngAfterViewChecked() {
    this.info.nativeElement.scrollTop = this.info.nativeElement.scrollHeight;
    this.error.nativeElement.scrollTop = this.error.nativeElement.scrollHeight;
  }
}

@Pipe({name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}

  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
