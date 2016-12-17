import { Component, Input } from '@angular/core'

//untyped library
const removeMd = require('remove-markdown')

@Component({
  selector: 'word-count',
  templateUrl: 'scripts/components/word-count.html'
})
export class WordCountComponent {
  @Input()
  content: string

  constructor() {}

  countWords(content) {
    var plainText = removeMd(content)

    return plainText.split(/[^\s]+/).length - 1
  }
}
