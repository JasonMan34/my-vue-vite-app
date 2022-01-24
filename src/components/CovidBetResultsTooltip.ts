import {
  ChartTypeRegistry,
  ScatterDataPoint,
  BubbleDataPoint,
  TooltipModel,
  Chart,
} from 'chart.js';
import { guesses, peopleTranslator, Person } from '../results';

interface TooltipContext {
  chart: Chart<
    keyof ChartTypeRegistry,
    (number | ScatterDataPoint | BubbleDataPoint | null)[],
    unknown
  >;
  tooltip: TooltipModel<keyof ChartTypeRegistry>;
}

export const CovidBetResultsTooltip = (context: TooltipContext) => {
  // Tooltip Element
  let tooltipEl = document.getElementById('chartjs-tooltip');

  // Create element on first render
  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'chartjs-tooltip';
    tooltipEl.innerHTML = '<div></div>';
    document.body.appendChild(tooltipEl);
  }

  // Hide if no tooltip
  const tooltipModel = context.tooltip;
  if (tooltipModel.opacity === 0) {
    tooltipEl.style.opacity = '0';
    return;
  }

  // Set caret Position (above, below,no-transform ).As I need above I don't delete that class
  tooltipEl.classList.remove('below', 'no-transform');

  // Set HTML & Data
  if (tooltipModel.body) {
    const data = tooltipModel.dataPoints[0];
    const label = data.label;
    const value = data.formattedValue.trim();

    const person = peopleTranslator(label as Person);
    const guess = guesses[person];
    const translatedGuess = guess.map(person => peopleTranslator(person));

    const innerHtml = `
      <div class="rounded-lg overflow-hidden" style="box-shadow: 0 6px 12px rgba(0,0,0,.175);">
          <div class="p-2" style="background-color: #ECEFF1; border-bottom: solid 2px #DDD">
             ${label} - ${value}
          </div>
          <div class="p-2 bg-white">
              <ol class="list-decimal list-inside">
              ${translatedGuess.map(person => `<li>${person}</li>`).join('')}
              </ol>
          </div>
       </div>
  `;

    tooltipEl.querySelector('div')!.innerHTML = innerHtml;
  }

  const position = context.chart.canvas.getBoundingClientRect();

  const highX = position.left + window.pageXOffset + tooltipModel.caretX + 8;
  const middleX = highX - tooltipEl.offsetWidth / 2;
  const lowX = highX - tooltipEl.offsetWidth;

  let left;
  if (highX + tooltipEl.offsetHeight < window.innerWidth) {
    left = highX;
  } else if (middleX + tooltipEl.offsetHeight < window.innerWidth) {
    left = middleX;
  } else {
    left = lowX;
  }

  const highY = position.top + window.pageYOffset + tooltipModel.caretY - 4;
  const middleY = highY - tooltipEl.offsetHeight / 2;
  const lowY = highY - tooltipEl.offsetHeight;

  let top;
  if (highY + tooltipEl.offsetHeight < window.innerHeight) {
    top = highY;
  } else if (middleY + tooltipEl.offsetHeight < window.innerHeight) {
    top = middleY;
  } else {
    top = lowY;
  }

  // Display, position, and set styles for font
  tooltipEl.style.opacity = '1';
  tooltipEl.style.position = 'absolute';
  tooltipEl.style.left = `${left}px`;
  tooltipEl.style.top = `${top}px`;
  // tooltipEl.style.padding =
  //   tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
  tooltipEl.style.pointerEvents = 'none';
};
