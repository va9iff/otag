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

class VMain extends VLitElement {
	render() {
		return html`
		<h1>UNEC - korpuslar və otaqların paylanma sistemi.</h1>
			<div class="binaContainer">
				<div class="binaButtons">
					<button
						@click=${e => {
							selectedBina = 0
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
							this.requestUpdate()
						}}
						class=${classMap({
							binaButton: true,
							selected: selectedBina == 1,
						})}
					>
						2
					</button>
					${data[selectedBina].bina}
				</div>
				<div class="bina">
					${data[selectedBina].stages.map(
						stage => html` ${console.log(stage)}
							${stage.stage ?? `Stage: ${stage.num ?? unique()}`}
							<div class="stage">
								${stage.rooms.map(
									room => html`
										<div class="room" state=${room.state}>
											${room.id ?? unique()}
											<div class="caption">
												${room.message ??
												(room.teacher
													? `${room.teacher} müəəllimin dərs`
													: "Boşdur")}
											</div>
										</div>
									`
								)}
							</div>`
					)}
				</div>
			</div>
		`
	}
}

VMain.tag = "v-main"
