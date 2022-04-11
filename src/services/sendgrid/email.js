const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function sendEmailConfirmationHTML(customerName, orderNro){
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE-edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Document</title>
	</head>
	<body>
		<div class="container section">
			<label>Paisaje</label>
			<img src="https://www.tooltyp.com/wp-content/uploads/2014/10/1900x920-8-beneficios-de-usar-imagenes-en-nuestros-sitios-web.jpg">
			<img src="https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg">
		</div>
	</body>
	</html>`
}

function getMessage(emailParams){
	return {
		to: emailParams.toEmail,
		from: 'karol.rojasb@autonoma.edu.co',
		subject: 'Confirmación orden de compra Black Friday',
		text: `Hola ${emailParams.customerName}, te enviamos las imagenes de los productos comprados y la factura con número ${emailParams.orderNro}. Gracias por tu compra`,
		html: sendEmailConfirmationHTML(emailParams.customerName, emailParams.orderNro)
	}
}

async function sendOrder(emailParams){
	try {
		await sgMail.send(getMessage(emailParams))
		return {message: 'Confirmación de compra enviada'}
	} catch (err) {
		const message = 'No se pudo enviar la orden de compra. Valide los errores'
		console.error(message)
		console.error(err)
		if (err.response) console.error(err.response.body)
		return {message}
	}
}

module.exports = { sendOrder}