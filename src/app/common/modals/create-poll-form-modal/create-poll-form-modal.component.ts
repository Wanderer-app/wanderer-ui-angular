import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseFormComponent } from '../../forms/base-form-component';

@Component({
  selector: 'app-create-poll-form-modal',
  templateUrl: './create-poll-form-modal.component.html',
  styleUrls: ['./create-poll-form-modal.component.css']
})
export class CreatePollFormModalComponent extends BaseFormComponent implements OnInit {

  pollAnswers: string[] = []
  addIcon = faPlus
  closeIcon = faTimes
  error?: string

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
    super(formBuilder.group({
      question: [''],
      answerText: ['']
    }))
   }

  ngOnInit(): void {
  }

  create() {

    if(this.pollAnswers.length < 2) {
      this.error = "მინიმუმ 2 პასუხი"
      return;
    }

    this.activeModal.close({
      question: this.form.controls.question.value,
      answers: this.pollAnswers
    })
  }

  addAnswer() {
    this.pollAnswers.push(this.form.controls.answerText.value)
    this.form.controls.answerText.setValue('')
  }

  removeAnswer(answer: string) {
    this.pollAnswers = this.pollAnswers.filter(a => a !== answer)

  }

}
