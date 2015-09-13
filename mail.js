/**
 * Created by Farzan on 9/8/2015.
 * Calculator using the Mithril js library
 * This is my first try to create a calculator and get the hang of
 * using Mithril functions and methods.
 * I've also used Wolframs API through a php code to evaluate and
 * return the response using Mithrils Ajax method
 */
var mail = {
    vm: {
       mails: m.prop({mails:[]}),
        content:m.prop('content'),
        currentID:m.prop('')
    },
    getmails: function()
    {
        //console.log(calc.vm.inpt());
        m.request(
            {
                method: "GET",
                background: true,
                url: "mailJSON.php",
                dataType: "json",
                data:
                {

                }
            })
            .then(function(response)
            {

                mail.vm.mails(response)
                console.log(mail.vm.mails())
                m.redraw();
            })
    },
    getcontent: function(mailID)
    {
        //console.log(calc.vm.inpt());
        m.request(
            {
                method: "GET",

                url: "contentJSON.php",
                dataType: "json",
                data:
                {
                id:mailID
                }
            })
            .then(function(response)
            {
                mail.vm.content(response)
                console.log(response)


            })
    },
    controller:function(){
      mail.getmails()
        console.log(mail.vm.mails())

    },
    view: function (ctrl) {
        return        m('div.col-md-8', [



                m('ul.div.col-md-8', [mail.vm.mails().mails.map(function(element)
                {
                        return m('li',{onclick:function(){mail.getcontent(element['id'])}},
                            [
                            m('div',{onclick:function(){
                                mail.vm.currentID(element['id']);
                                m.route('/mailcontent')}},element['id']),
                            m('div',element['from']),
                            m('div',element['to']),
                            m('h4',element['subject'])
                        ]);

                })]),
                m('div.div.col-md-4',mail.vm.content())




       ]
       //return m('div',
       //     mail.vm.mails().mails.map(function(element,idx){
       //         console.log(element)
       //         return m('div',element.from)
       //     })



            )

    }
}
var mailContent = {
    getcontent: function(mailID)
    {
        //console.log(calc.vm.inpt());
        m.request(
            {
                method: "GET",

                url: "contentJSON.php",
                dataType: "json",
                data:
                {
                    id:mailID
                }
            })
            .then(function(response)
            {
                mail.vm.content(response)
                console.log(response)


            })
    },
    controller: function() {

    },
    view: function(controller) {
        return m("div" ,mail.vm.currentID());
    }
}

m.route.mode = "search";

m.route(document.getElementById('row'), "/mail", {
    "/mail": mail,
    "/mailcontent": mailContent

});

//m.mount(document.getElementById('row'), mail);
