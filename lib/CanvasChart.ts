///<reference path='refs.ts'/>
module TDev.RT.Charts {
    export class Point {
        constructor (public x: number, public y: number) { }
    }

    export class CanvasChart {
        public lineColor = "#f00";
        public gridColor = "#ccc";
        public backgroundColor :string = undefined;
        public axesColor = "#fff";
        public gridLineWidth = 1;
        public graphLineWidth = 2;
        public axesFontSize = 6;
        public gridRows = 11;
        public gridCols = 11;
        public area = true;

        // Variables used for data configuration.
        private points: Point[];

        // Variables used for canvas / drawing.
        private canvas : HTMLCanvasElement;
        private context: CanvasRenderingContext2D;

        // Variables used for grid creation.
        private gridWidth: number;
        private gridHeight: number;

        // Variables that control the rendered area.
        private chartWidth: number;
        private chartHeight: number;
        private scaleXMin: number;
        private scaleXMax: number;
        private scaleYMin: number;
        private scaleYMax: number;

        // Variables that control styling.
        private axesPaddingX: number;
        private axesPaddingY: number;

        constructor() {
            this.axesPaddingX = 20;
            this.axesPaddingY = 30;
        }

        public drawChart(canvas: HTMLCanvasElement, points: TDev.RT.Charts.Point[]) {
            this.initialize(canvas, points);
            if (this.points.length < 2) return;
            // Sort the points so our line doesn't cross.
            this.points.sort(function (left, right) {
                if (left.x > right.x) {
                    return 1;
                }
                if (left.x < right.x) {
                    return -1;
                }
                return 0;
            });

            // Determine the scale for drawing axes / points.
            this.calculateScale();
            this.drawAxes();
            this.drawChartGrid();
            this.drawGraphPoints();
        }

        private initialize(canvas: HTMLCanvasElement, points: Point[]) {
            this.canvas = canvas;
            this.context = this.canvas.getContext("2d");
            this.points = points;

            // Calculate the area that the graph/chart will be drawn in.
            this.chartWidth = canvas.width - this.axesPaddingY;
            this.chartHeight = canvas.height - this.axesPaddingX;
            this.context.save();
            this.context.clearRect(0, 0, canvas.width, canvas.height);
        }

        private drawChartGrid() {
            if (this.backgroundColor) {
                this.context.save();
                this.context.fillStyle = this.backgroundColor;
                this.context.fillRect(0, 0, this.chartWidth, this.chartHeight);
                this.context.restore();
            }

            this.context.save();
            this.context.strokeStyle = this.gridColor;
            this.context.lineWidth = this.gridLineWidth;
            this.context.strokeRect(0, 0, this.chartWidth, this.chartHeight);

            var tipLength = 5;

            for (var i = 0; i < this.gridCols; i++) {
                this.context.beginPath();
                this.context.moveTo(i * this.gridWidth, this.chartHeight);
                this.context.lineTo(i * this.gridWidth, this.chartHeight - tipLength);
                this.context.stroke();

                this.context.beginPath();
                this.context.moveTo(i * this.gridWidth, 0);
                this.context.lineTo(i * this.gridWidth, tipLength);
                this.context.stroke();
            }
            for (var i = 0; i < this.gridRows; i++) {
                this.context.beginPath();
                this.context.moveTo(0, i * this.gridHeight);
                this.context.lineTo(tipLength, i * this.gridHeight);
                this.context.stroke();

                this.context.beginPath();
                this.context.moveTo(this.chartWidth, i * this.gridHeight);
                this.context.lineTo(this.chartWidth - tipLength, i * this.gridHeight);
                this.context.stroke();
            }
            this.context.restore();
        }

        ////drawAxes
        // Draws the axes based on how the chart is configured
        // Parameters : none
        // Returns    : none
        //
        // Notes: This could have a better handling for determining how to
        // label the axes, for example, it could determine the scales and
        // so forth for the font size and positioning.
        private drawAxes() {
            this.context.save();
            var xRange = this.scaleXMax - this.scaleXMin;
            var yRange = this.scaleYMax - this.scaleYMin;

            var xUnit = xRange / this.gridCols;
            var yUnit = yRange / this.gridRows;

            this.context.fillStyle = this.axesColor;
            this.context.font = this.axesFontSize + "pt Arial";

            // Draw the y-axes labels.
            var text = '';
            for (var i = 0; i <= this.gridRows; i++) {
                text = Math_.round_with_precision(this.scaleYMax - (i * yUnit), 2).toString();
                var y = i * this.gridHeight + this.axesFontSize / 2;
                if (i === this.gridRows)
                    y -= this.axesFontSize / 2;
                else if (i === 0)
                    y += this.axesFontSize / 2;
                this.context.fillText(text, this.chartWidth + 5, y);
            }

            // Draw the x-axis labels
            for (i = 0; i <= this.gridCols; i++) {
                text = Math_.round_with_precision(this.scaleXMin + (i * xUnit), 2).toString();
                this.context.fillText(text, i * this.gridWidth, this.chartHeight + (this.axesPaddingX - this.axesFontSize));
            }
            this.context.restore();
        }

        ////calculateScale
        // Determines what the axes should be for graphing
        //
        // Parameters:
        //   points - Array of points with x and y values
        //
        // Returns: none
        private calculateScale() {

            this.scaleXMin = this.points[0].x;
            this.scaleXMax = this.points[0].x;
            this.scaleYMax = this.points[0].y;
            this.scaleYMin = this.points[0].y;
            for (var j = 0, len2 = this.points.length; j < len2; j++) {
                if (this.scaleXMax < this.points[j].x) {
                    this.scaleXMax = this.points[j].x;
                }
                if (this.scaleYMax < this.points[j].y) {
                    this.scaleYMax = this.points[j].y;
                }
                if (this.scaleXMin > this.points[j].x) {
                    this.scaleXMin = this.points[j].x;
                }
                if (this.scaleYMin > this.points[j].y) {
                    this.scaleYMin = this.points[j].y;
                }
            }

            // update axis to look better
            var rx = CanvasChart.generateSteps(this.scaleXMin, this.scaleXMax, this.gridCols);
            this.scaleXMin = rx[0];
            this.scaleXMax = rx[1];
            this.gridCols = rx[2];
            var ry = CanvasChart.generateSteps(this.scaleYMin, this.scaleYMax, this.gridRows);
            this.scaleYMin = ry[0];
            this.scaleYMax = ry[1];
            this.gridRows = ry[2];

            // avoid empty interval
            if (this.scaleXMin === this.scaleXMax) {
                this.scaleXMin = 0.5;
                this.scaleXMax = 0.5;
            }
            if (this.scaleYMin === this.scaleYMax) {
                this.scaleYMin = 0.5;
                this.scaleYMax = 0.5;
            }

            // Calculate the grid for background / scale.
            this.gridWidth = this.chartWidth / this.gridCols;  // This is the width of the grid cells (background and axes).
            this.gridHeight = this.chartHeight / this.gridRows; // This is the height of the grid cells (background axes).
        }

        static generateSteps(start: number, end: number, numberOfTicks: number) : number[] {
            var bases = [1, 5, 2, 3]; // Tick bases selection
            var currentBase: number;
            var n: number;
            var intervalSize: number, upperBound: number, lowerBound: number;
            var nIntervals: number, nMaxIntervals: number;
            var the_intervalsize = 0.1;

            var exponentYmax =
                Math.floor(Math.max(Math_.log10(Math.abs(start)), Math_.log10(Math.abs(end))));
            var mantissaYmax = end / Math.pow(10.0, exponentYmax);

            // now check if numbers can be cleaned...
            // make it pretty
            var significative_numbers = Math.min(3, Math.abs(exponentYmax) + 1);

            var expo = Math.pow(10.0, significative_numbers);
            var start_norm = Math.abs(start) * expo;
            var end_norm = Math.abs(end) * expo;
            var mant_norm = Math.abs(mantissaYmax) * expo;

            // trunc ends
            var ip_start, ip_end;
            var start = ip_start = Math.floor(start_norm * Math_.sign(start));
            var end = ip_end = Math.ceil(end_norm * Math_.sign(end));

            mantissaYmax = Math.ceil(mant_norm);

            nMaxIntervals = 0;
            for (var k = 0; k < bases.length; ++k)
            {
                // Loop initialisation
                currentBase = bases[k];
                n = 4; // This value only allows results smaller than about 1000 = 10^n


                do // Tick vector length reduction
                {
                    --n;
                    intervalSize = currentBase * Math.pow(10.0, exponentYmax - n);

                    upperBound =
                        Math.ceil(mantissaYmax * Math.pow(10.0, n) / currentBase)
                        * intervalSize;

                    nIntervals =
                        Math.ceil((upperBound - start) / intervalSize);
                    lowerBound = upperBound - nIntervals * intervalSize;
                }
                while (nIntervals > numberOfTicks);

                if (nIntervals > nMaxIntervals) {
                    nMaxIntervals = nIntervals;
                    ip_start = ip_start = lowerBound;
                    ip_end = upperBound;
                    the_intervalsize = intervalSize;
                }
            }

            // trunc ends
            if (start < 0)
                start = Math.floor(ip_start) / expo;
            else
                start = Math.ceil(ip_start) / expo;

            if (end < 0)
                end = Math.floor(ip_end) / expo;
            else
                end = Math.ceil(ip_end) / expo;

            return [start, end, nMaxIntervals];
        }

        ////graphPoints
        // Draws the points on a chart.
        //
        // Parameters:
        //   points - An array of points to draw.
        //
        // Returns: none
        private drawGraphPoints() {
            this.context.save();

            // Determine the scaling factor based on the min / max ranges.
            var xRange = this.scaleXMax - this.scaleXMin;
            var yRange = this.scaleYMax - this.scaleYMin;

            var xFactor = this.chartWidth / xRange;
            var yFactor = this.chartHeight / yRange;

            var draw = (close: boolean) => {
                var nextX = (this.points[0].x - this.scaleXMin) * xFactor;
                var nextY = (this.points[0].y - this.scaleYMin) * yFactor;
                var startX = nextX;
                var startY = nextY;
                this.context.moveTo(nextX, this.chartHeight - nextY);
                for (var i = 1, len = this.points.length; i < len; i++) {
                    nextX = (this.points[i].x - this.scaleXMin) * xFactor,
                    nextY = (this.points[i].y - this.scaleYMin) * yFactor;
                    this.context.lineTo(nextX, (this.chartHeight - nextY));
                }
                if (close) {
                    this.context.lineTo(nextX, this.chartHeight);
                    this.context.lineTo(startX, this.chartHeight);
                    this.context.closePath();
                }
            }

            // If we use a 'miterlimit' of .5 the elbow width, the elbow covers the line.
            this.context.miterLimit = this.graphLineWidth / 4;
            this.context.strokeStyle = this.lineColor;
            this.context.lineWidth = this.graphLineWidth;

            if (this.area) {
                this.context.fillStyle = this.lineColor;
                this.context.globalAlpha = 0.3;
                this.context.beginPath();
                draw(true);
                this.context.fill();
                this.context.globalAlpha = 1;
            }

            this.context.beginPath();
            draw(false);
            this.context.stroke();

            this.context.restore();
        }
    }
}