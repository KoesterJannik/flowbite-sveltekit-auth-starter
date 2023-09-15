import easyinvoice from 'easyinvoice';
import fs from 'fs';

/*

    invoice?: string;
        number?: string;
        date?: string;
        "due-date"?: string;
        subtotal?: string;
        products?: string;
        quantity?: string;
        price?: string;
        "product-total"?: string;
        total?: string;
        vat?: string;
*/
const data = {
	translate: {
		invoice: 'Rechnung',
		number: 'Rechnungsnummer',
		date: 'Datum',
		'due-date': 'Fälligkeitsdatum',
		subtotal: 'Zwischensumme',
		products: 'Produkte',
		quantity: 'Menge',
		description: 'Beschreibung',
		price: 'Preis',
		product_total: 'Produktsumme',
		vat: 'Steuer',
		total: 'Gesamt'
	},
	sender: {
		company: 'Köster Webservices',
		address: 'Rotdornweg 26a',
		zip: '59964',
		city: 'Medebach',
		country: 'Deutschland'
	},
	client: {
		company: 'ByteCreations LLC',
		address: '108 West 13th Street',
		zip: '19801',
		city: 'Wilmington,Delaware 19801',
		country: 'United States Minor Outlying Islands'
	},
	information: {
		number: '01',
		date: '05.09.2023',
		'due-date': '15.09.2023'
	},
	products: [
		{
			quantity: '20',
			description: 'Nachhilfe Entwicklungsstunden',
			'tax-rate': 0,
			price: 40
		}
	],
	'bottom-notice': `
    Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.
Bitte überweisen Sie den Rechnungsbetrag innerhalb von 14 Tagen ohne Abzug auf folgendes Konto:
Sparkasse Hochsauerland
416 517 70
DE09 4165 1770 0071 5571 10
WELADED1HSL
Steuernummer: DE360314993
    `,
	settings: {
		currency: 'EUR',
		'tax-notation': 'MwsT',
		'margin-top': 25,
		'margin-right': 25,
		'margin-left': 25,
		'margin-bottom': 25
	}
};

async function run() {
	const result = await easyinvoice.createInvoice(data);
	fs.writeFileSync('invoice.pdf', result.pdf, 'base64');
}

run();
