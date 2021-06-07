import { FormGroup } from "@angular/forms"

export abstract class BaseFormComponent {

    constructor(public form: FormGroup) {}

    errorClasses(element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): string {
        if(this.isInValid(element)) {
          return "border-danger"
        }
        return ""
      
      }
    
      isInValid(element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): boolean {
        let controlName = element.getAttribute("formControlName")!
        let control = this.form.controls[controlName]
        return control.invalid && (control.dirty || control.touched)
      }

      getErrors(element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): string[] {
        let controlName = element.getAttribute("formControlName")!
        let control = this.form.controls[controlName]
    
        let errorMessages = []        
            
        if (control.errors) {
          if (control.errors.required) {
            errorMessages.push("ველის შევსება აუცილებელია")
          }
          if (control.errors.min) {
            errorMessages.push(`მნიშვნელობა არ უნდა იყოს ${element.getAttribute("min")!}-ზე ნაკლები `)
          }
          if (control.errors.max) {
            errorMessages.push(`მნიშვნელობა არ უნდა აღემატებოდეს ${element.getAttribute("max")!}-ს`)
          }
          if (control.errors.minlength) {
            errorMessages.push(`მნიშვნელობა არ უნდა შეიცავდეს ${control.errors.minlength.requiredLength}-ზე ნაკლებ სიმბოლოს`)
          }
          if (control.errors.maxlength) {
            errorMessages.push(`მნიშვნელობა არ უნდა შეიცავდეს ${control.errors.maxlength.requiredLength}-ზე მეტ სიმბოლოს`)
          }
          if (control.errors.pattern) {
            errorMessages.push(element.getAttribute('patternError')!)
          }
          if(control.errors.notFound) {
            errorMessages.push(control.errors.notFound.errorText);            
          }
          if(control.errors.registration) {
            errorMessages.push(control.errors.registration.errorText);            
          }
          if(control.errors.custom) {
            errorMessages.push(control.errors.custom.errorText);            
          }
          if(control.errors.email) {
            errorMessages.push("ელ-ფოსტა არავალიდურია");            
          }
          return errorMessages
        }
        return []
      
      }

}