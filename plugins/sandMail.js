import Vue from 'vue'

Vue.mixin({
	data: () => ({
		data: {
			access_token: "ucqe2iq7nwb3m8wmy8lgkbq0",// get API key from https://postmail.invotes.com/ ucqe2iq7nwb3m8wmy8lgkbq0
		},
		subject: "message from the website anissimus.ru",
		text: '\n\n Client: «{{name}}»\n\n Contacts: «{{contact}}»\n\n Task description: «{{description}}»\n\n\n\n\n\nThe email is generated automatically on the website anissimus.ru . It does not need to be answered'
	}),
	methods:{
		sandMail(value) {
			var request = new XMLHttpRequest();
			request.onreadystatechange = () => {
				if (request.readyState == 4 && request.status == 200) {
					this.$store.dispatch('isSandMail', true)
					this.showModalMail = true
				} else if(request.readyState == 4) {
					this.$store.dispatch('isSandMail', false)
					this.showModalMail = true
				}
			};

			this.data['subject'] = this.subject
			this.data['text'] = this.text.replace('{{name}}', value.name).replace('{{contact}}', value.contact).replace('{{description}}', value.description)

			const params = this.toParams(this.data)

			request.open("POST", "https://postmail.invotes.com/send", true)
			request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
			request.send(params);
		},
		toParams(data) {
			var form_data = [];
			for ( var key in data ) {
				form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
			}

			return form_data.join("&")
		}
	}
})