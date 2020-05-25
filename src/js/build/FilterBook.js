$(document).ready(function() {
    $('#more').click(function() {
        $('.filter-more').toggleClass('full');
    });


    var load = false;


    setTimeout(() => {
        $('#filter-form').submit();
    }, 100);


    $('#filter-form').submit(function(e) {


        e.preventDefault();
        var form = $(this).serializeArray();
        

        var mapper = {
            'title' : 'title',
            'author' : 'author.name',
            'status' : 'status',
            'published_at' : 'published_at',
            'publisher' : 'publisher.name',
        };


        var mode = form.filter((field) => { return field.name == "mode" });

        var query = window._Filter.filter(window.__RequestDomainTech, form, mapper, mode);

        var url = query;


        $.ajax({
            url: url,
            type: 'get',
            beforeSend: function (ajax) {
                ajax.setRequestHeader('secret', 'test-value');
                if (load) {
                // loading         
                $('.filter-btn').html(`
                <div id="floatingBarsG">
                    <div class="blockG" id="rotateG_01"></div>
                    <div class="blockG" id="rotateG_02"></div>
                    <div class="blockG" id="rotateG_03"></div>
                    <div class="blockG" id="rotateG_04"></div>
                    <div class="blockG" id="rotateG_05"></div>
                    <div class="blockG" id="rotateG_06"></div>
                    <div class="blockG" id="rotateG_07"></div>
                    <div class="blockG" id="rotateG_08"></div>
                </div> 
                `);
                $('.filter-btn').attr('disabled', true);
                }
                
            },
            success: function (response) {
                $("#books").html('');
            },
            complete: function (data) {


                if (load) {
                    setTimeout(() => {
                        $('.filter-btn').attr('disabled', false);
                        $('.filter-btn').text('Search');
                    }, 1000)
                
                }

                load = true;

                var books = JSON.parse(data.responseText);

                if (books.data.length >= 1) {
                    $.each(books.data, function (book) {

                    $("#books").fadeIn();

                    setTimeout(() => {


                    var publisher = '';

                    $.each(books.data[book].publisher, function (index, value) {
                        publisher += `<span class="badge badge-primary s-85 p-1 m-1">${value['name']}</span>`;
                    })

                    var author = '';

                    $.each(books.data[book].author, function (index, value) {
                        author += `<span class="badge font-weight-bolder s-100">${value['name']}</span>,`;
                    })

                    author = author.substr(0, author.length - 1);

                    $("#books").append(
                        `
                        <div class="card mb-2">
                        <div class="card-header">
                        <div class="card-title">
                            <p class="float-left">${books.data[book].title}</p>
                            <span class="float-right p-1 badge ${books.data[book].status ? 'badge-success': 'badge-danger'}">
                                ${books.data[book].status ? 'stock': 'borrow'}
                            </span>
                        </div>
                        </div>
                        <div class="card-body">
                            <li>Author: <span class="text-bold text-primary">
                                ${author}
                            </span></li>
                            <li>Published At: <span class="text-bold text-primary">${books.data[book].published_at}</span></li>
                            <li>Publisher: 
                            ${publisher}</li>
                        </div>
                    </div>
                        `
                    );


                }, 1000)


                });
                }
                else 
                {

                    setTimeout(() => {


                    $("#books").append(
                        `
                        <p class="text-black-50 text-center">No Result Found</p>
                        `
                    );

                    }, 1000);
                }

                

            }

        });


        })

        

        // window.Filter.setForm(form)
        // console.log(window.Filter.getForm())

});