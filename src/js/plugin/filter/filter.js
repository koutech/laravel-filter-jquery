export default class Filter 
{
    function() {
            
        this.form = '';

        this.mapper = [];

        this.url = '';

        this.active = false;

        if (arguments[0] && typeof arguments[0] === "array") {
            this.form = arguments[0]
        }

        if (arguments[1] && typeof arguments[1] === "array") {
            this.mapper = arguments[1]
        }


    }

    filter(domain, form, mapper = [], mode = []) 
    {

        // first set Form
        this.setForm(form)

        if (mapper.length >= 1) {
            // second set mapper 
            this.setMapper(mapper)
        }

        domain = this.checkDomain(domain)


        this.url = domain;


        this.form.forEach((field) => {

            
            if (field.value.length > 0 
                && field.name !== 'mode' 
                && field.value.length >= 1
                ) 
            {
                this.url += 'filter[' + mapper[field.name] + ']=' + encodeURI(field.value) + '&&'
                if (!this.active) {
                    this.active = true;
                }
            }

            // console.log(field.name, field.value);
        });


        if (this.active) {
            this.url = this.url.substr(0, this.url.length - 2)
        }

        if (mode.length >= 1) {
            this.url += '&&mode=' + mode[0].value
        }

        console.log(this.url);

        return this.url

        

    }

    checkDomain(domain) 
    {
        if (domain.slice(domain.length - 1) === '?') {
            return domain;
        }

        return domain + '?';

    }

    // set form
    setForm(form) 
    {
        if (!typeof(form) === 'array') {
            return
        }

        this.form = form
    }

    // get form
    getForm()
    {
        return this.form
    }

    // set mapper 
    setMapper(mapper) 
    {
        if (!typeof(mapper) === 'array') {
            return
        }

        this.mapper = mapper
    }

    // get mapper  
    getMapper() 
    {
        return this.mapper
    }

    
}