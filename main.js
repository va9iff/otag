import { html, css, LitElement, VLitElement, classMap } from "./lit.js"

let unique = ((c = 0) => () => c++)()
let times = (t, s = 0) =>
	"_"
		.repeat(t)
		.split("_")
		.map(() => s++)
window.times = times

console.log(times(9))

import { data, setData } from "./otags.js"
let selectedBina = 0

let opened = {}

function getMessage(room) {
	return room.message ??
			(room.teacher
				? `${room.teacher} müəəllimin dərs`
				: "Boşdur")
}

class VMain extends VLitElement {
	render() {
		return html`
		<div class="header">
		<img src="./UNEC-logo.png" height=55 alt="">
		<h1> Bütün korpuslar üzrə otaqların paylanma sistemi</h1>
		</div>
		<div class="binaButtons">
			<button
				@click=${e => {
					selectedBina = 0
					opened = {}
					this.requestUpdate()
				}}
				class=${classMap({
					binaButton: true,
					selected: selectedBina == 0,
				})}
			>
				1
			</button>
			<button
				@click=${e => {
					selectedBina = 1
					opened = {}
					this.requestUpdate()
				}}
				class=${classMap({
					binaButton: true,
					selected: selectedBina == 1,
				})}
			>
				2
			</button>
			<button
				@click=${e => {
					selectedBina = 2
					opened = {}
					this.requestUpdate()
				}}
				class=${classMap({
					binaButton: true,
					selected: selectedBina == 2,
				})}
			>
				3
			</button>
			${data[selectedBina].bina}
		</div>
		<div class="page">
			<div class="binaContainer">
				<div class="bina">
					${data[selectedBina].stages.map(
						stage => html` ${console.log(stage)}
							${stage.stage ?? `Stage: ${stage.num ?? unique()}`}
							<div class="stage">
								${stage.rooms.map(
									room => html`
										<div class=${classMap({room: true,
											selected: room.id == opened.id
									})} state=${room.state} @click = ${e=>{
											if (room == opened) {
												opened = {}
												this.requestUpdate()
												return
											}
											opened = room
											this.requestUpdate()
										}}>
											${room.id ?? unique()}
											<div class="caption">
												${getMessage(room)}
											</div>
										</div>
									`
								)}
							</div>`
					)}
				</div>
			</div>
			<div class=${classMap({
				content: true,
				hidden: !opened.id
			})}>
			<h2>${opened.id} nömrəli otaq</h2>
			<p style = "font-weight: 200; font-size: 20px;">Bugün üçün ayrılmış cədvəl:</p>
			<br><br>
			<h3>Səhər</h3>
			<h4>8:30 - 9:50</h4>
			-
			<h4>10:00 - 11:20</h4>
			-
			<h4>11:30 - 12:50</h4>
			-
			<br>
			<br>
			<br>
			<h3>Günorta</h3>
			<h4>14:00 - 15:20</h4>
			-
			<h4>15:30 - 16:50</h4>
			-
			<h4>17:00 - 18:30</h4>
			-

			</div>
			</div>
		`
	}
}

VMain.tag = "v-main"
