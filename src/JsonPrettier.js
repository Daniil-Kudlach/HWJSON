export class JsonPrettier {
    constructor() {
        this.section = document.createElement('section');
        this.section.classList.add('json-prettier-section');
        this.btn;
        this.input;
        this.output;
        this.error;
        this.errorMessage = '[format-error]';
        this.json;

    }
    
    init() {
        this.btn = document.querySelector('.json-prettier-btn');
        this.input = document.querySelector('#json-prettier-textarea-input');
        this.input.addEventListener('input', this.onChange.bind(this));
        this.output = document.querySelector('#json-prettier-textarea-output');
        this.error = document.querySelector('.json-prettier-error');
        this.btn.addEventListener('click', this.click.bind(this));
    }

    onChange() {
        this.error.innerHTML = '';
    }

    click(ev) {
        console.log(ev)
        if (this.input.value.trim().length > 0) {
            try {
                this.json = JSON.parse(this.input.value);
                this.input.value = '';
                this.output.value = JSON.stringify(this.json, null, 4);
            } catch (e) {
                this.error.innerHTML = this.errorMessage;
                return;
            }
        }
    }

    getContent() {
        this.section.innerHTML = `
        <div class="json-prettier-block-ta-input">
            <h2>Enter JSON data:<span class='json-prettier-error'><span></h2>
            <textarea name="json-prettier-textarea-input" id="json-prettier-textarea-input" rows="100"></textarea>
            </div>
<div class="json-prettier-block-btn">
<button class="json-prettier-btn"><img src="././img/caret-right-solid.svg" alt="caret-right" width="50%"></button>
</div>
        <div class="json-prettier-block-ta-output">
            <h2>Formatted JSON data:</h2>
            <textarea name="json-prettier-textarea-output" id="json-prettier-textarea-output" rows="100" disabled></textarea>
        </div>`;
        return this.section;
    }
}