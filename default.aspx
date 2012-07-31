<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="WebApplication._default" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" style="height:100%; width:100%">
<head runat="server">
    <title>Web Application</title>
	<script src="scripts/jquery-1.7.2.js" type="text/javascript"></script>
	<script src="scripts/knockout-2.1.0.debug.js" type="text/javascript"></script>
	<script src="scripts/idExtender.js" type="text/javascript"></script>
	<script src="scripts/dimensionsExtender.js" type="text/javascript"></script>
	<script src="scripts/styleExtenders.js" type="text/javascript"></script>
	<script src="scripts/vm.js" type="text/javascript"></script>
    <script src="scripts/utils.js" type="text/javascript"></script>
	<script src="scripts/dimensions.js" type="text/javascript"></script>
    <script src="scripts/provider.js" type="text/javascript"></script>
    <script src="scripts/expressions.js" type="text/javascript"></script>
    <script src="vms/webapp.js" type="text/javascript"></script>
    <script src="vms/layout.js" type="text/javascript"></script>
    <script src="vms/label.js" type="text/javascript"></script>
    <script src="vms/fluidpanel.js" type="text/javascript"></script>
	<link rel="Stylesheet" href="app.css" />
</head>
<script type="text/javascript">
    
    var template = {
        controls: [{
            type: wsq.controls.layout,
            minWidth: "600px",
            minHeight: "400px",
            invertTopBottom: "$.invertTopBottom",
            top: {
                height: "30px",
                minHeight: "30px",
                classes: {
                    "app-top": true
                },
				invertedClasses: {
					"app-top-inverted": true
				},
                controls: [{
                    type: wsq.controls.layout,
                    right: {
                        width: "100px",
                        classes: {
                            "app-version": true
                        },
                        controls: [{
                            type: wsq.controls.label,
                            text: "\"version \" + $.version"
                        }]
                    },
                    middle: {
                        controls: [{
                            type: wsq.controls.label,
                            text: "$.name"
                        }]
                    }
                }]
            },
            bottom: {
                height: "30px",
                classes: {
                    'app-bottom':true
                },
				invertedClasses: {
					"app-bottom-inverted": true
				},
                controls: [{
                    type: wsq.controls.fluidpanel,
                    data: "$.bottom",
					controls: [{
                        type: wsq.controls.label,
                        text: "$.text"
                    }],
                }]
            },
            middle: {
                controls: [{
                    type: wsq.controls.layout,
                    invertLeftRight: "$.invertLeftRight",
					left: {
						collapsible: true,
						width: "250px",
                        classes: {
                            'app-left': true
                        },
						controls: []
					},
                    leftCollapser: {
                        classes: {
                            'app-left-collapser': true
                        }
                    }
                }]
            }
        }]
    }

    var data = {
        name: "Designer Test Application",
        version: ko.observable("0.0.1"),
        invertTopBottom: ko.observable(false),
        invertLeftRight: ko.observable(false),
        top: {
            text: "top"
        },
        bottom: {
            text: "Status bar..."
        },
        left: {
            text: "left"
        },
        right: {
            text: "right"
        },
        middle: {
            text: "middle"
        }
    }


    function invert() {
    	data.invertTopBottom(data.invertTopBottom() ? false : true);
    }

    function invert2() {
    	data.invertLeftRight(data.invertLeftRight() ? false : true);
    }
</script>
<script type="text/html" id="app">
	<div data-bind="style: { height: dimensions.height, width: dimensions.width}">
		<!--<span data-bind="text: name"></span>
		<br />
		<span data-bind="text: version"></span>-->
        <!-- ko foreach: controls -->
            <!-- ko template: viewTemplate -->
            <!-- /ko -->
        <!-- /ko -->
	</div>
</script>
<script type="text/html" id="layout">
    <div data-bind="style: { height: dimensions.height, width: dimensions.width}">
		<!-- ko if: !invertTopBottom() -->
			<!-- ko if: !top.collapsed() -->
				<div class="clear" data-bind="css: top.cssClasses, wsqstyleheight: {obj: top.dimensions}, wsqstylewidth: {obj: top.dimensions}, foreach: top.controls">
					<!-- ko template: viewTemplate --><!-- /ko -->
				</div>
			<!-- /ko -->
			<!-- ko if: top.collapsible -->
				<!-- ko template: {name: topCollapser.viewTemplate, data: topCollapser} --><!-- /ko -->
			<!-- /ko -->
		<!-- /ko -->
		<!-- ko if: invertTopBottom() -->
			<!-- ko if: !bottom.collapsed() -->
				<div class="clear" data-bind="foreach: bottom.controls, css: bottom.invertedCssClasses, wsqstyleheight: {obj: bottom.dimensions}, wsqstylewidth: {obj: bottom.dimensions}">
					<!-- ko template: viewTemplate --><!-- /ko -->
				</div>
			<!-- /ko -->
			<!-- ko if: bottom.collapsible -->
				<!-- ko template: {name: bottomCollapser.viewTemplate, data: bottomCollapser} --><!-- /ko -->
			<!-- /ko -->
		<!-- /ko -->
        <div data-bind="style: { height: middleHeight, width: dimensions.width}">
            <!-- ko if: !invertLeftRight() -->
				<!-- ko if: !left.collapsed() -->
					<div class="layout-horizontal" data-bind="foreach: left.controls, css: left.cssClasses, wsqstyleheight: {obj: left.dimensions}, wsqstylewidth: {obj: left.dimensions}">
						<!-- ko template: viewTemplate --><!-- /ko -->
					</div>
				<!-- /ko -->
				<!-- ko if: left.collapsible -->
					<!-- ko template: {name: leftCollapser.viewTemplate, data: leftCollapser} --><!-- /ko -->
				<!-- /ko -->
			<!-- /ko -->
			<!-- ko if: invertLeftRight() -->
				<!-- ko if: !right.collapsed() -->
					<div class="layout-horizontal" data-bind="foreach: right.controls, css: right.invertedCssClasses, wsqstyleheight: {obj: right.dimensions}, wsqstylewidth: {obj: right.dimensions}">
						<!-- ko template: viewTemplate --><!-- /ko -->
					</div>
				<!-- /ko -->
				<!-- ko if: right.collapsible -->
					<!-- ko template: {name: rightCollapser.viewTemplate, data: rightCollapser} --><!-- /ko -->
				<!-- /ko -->
			<!-- /ko -->
            <div class="layout-horizontal" data-bind="foreach: middle.controls, css: middle.cssClasses, wsqstyleheight: {value: middleHeight, obj: middle.dimensions}, wsqstylewidth: {value: middleWidth, obj: middle.dimensions}">
				<!-- ko template: viewTemplate --><!-- /ko -->
			</div>
			<!-- ko if: !invertLeftRight() -->
				<!-- ko if: right.collapsible -->
					<!-- ko template: {name: rightCollapser.viewTemplate, data: rightCollapser} --><!-- /ko -->
				<!-- /ko -->
				<!-- ko if: !right.collapsed() -->
					<div class="layout-horizontal" data-bind="foreach: right.controls, css: right.cssClasses, wsqstyleheight: {obj: right.dimensions}, wsqstylewidth: {obj: right.dimensions}">
						<!-- ko template: viewTemplate --><!-- /ko -->
					</div>
				<!-- /ko -->
			<!-- /ko -->
			<!-- ko if: invertLeftRight() -->
				<!-- ko if: left.collapsible -->
					<!-- ko template: {name: leftCollapser.viewTemplate, data: leftCollapser} --><!-- /ko -->
				<!-- /ko -->
				<!-- ko if: !left.collapsed() -->
					<div class="layout-horizontal" data-bind="foreach: left.controls, css: left.invertedCssClasses, wsqstyleheight: {obj: left.dimensions}, wsqstylewidth: {obj: left.dimensions}">
						<!-- ko template: viewTemplate --><!-- /ko -->
					</div>
				<!-- /ko -->
			<!-- /ko -->
        </div>
		<!-- ko if: !invertTopBottom() -->
			<!-- ko if: bottom.collapsible -->
				<!-- ko template: {name: bottomCollapser.viewTemplate, data: bottomCollapser} --><!-- /ko -->
			<!-- /ko -->
			<!-- ko if: !bottom.collapsed() -->
				<div class="clear" data-bind="foreach: bottom.controls, css: bottom.cssClasses, wsqstyleheight: {obj: bottom.dimensions}, wsqstylewidth: {obj: bottom.dimensions}">
					<!-- ko template: viewTemplate --><!-- /ko -->
				</div>
			<!-- /ko -->
		<!-- /ko -->
		<!-- ko if: invertTopBottom() -->
			<!-- ko if: top.collapsible -->
				<!-- ko template: {name: topCollapser.viewTemplate, data: topCollapser} --><!-- /ko -->
			<!-- /ko -->
			<!-- ko if: !top.collapsed() -->
				<div class="clear" data-bind="foreach: top.controls, css: top.invertedCssClasses, wsqstyleheight: {obj: top.dimensions}, wsqstylewidth: {obj: top.dimensions}">
					<!-- ko template: viewTemplate --><!-- /ko -->
				</div>
			<!-- /ko -->
		<!-- /ko -->
    </div>
</script>
<script type="text/html" id="fluidpanel">
    <div data-bind="foreach: controls, wsqid: true, wsqdimensions: true">
        <!-- ko template: viewTemplate -->
        <!-- /ko -->
    </div>
</script>
<script type="text/html" id="label">
    <span data-bind="text: text, wswid: true, wsqdimensions: true"></span>
</script>
<script type="text/html" id="label2">
    <span data-bind="text: text, wswid: true, wsqdimensions: true"></span>
	<button onclick="invert2()">invert</button>
</script>
<script type="text/html" id="layoutTopCollapser">
    <div class="clear" data-bind="wsqid: true, wsqdimensions: true, click: toggleCollapse, css: cssClasses, wsqstyleheight: {obj: dimensions}">Top Collapser</div>
</script>
<script type="text/html" id="layoutBottomCollapser">
    <div class="clear" data-bind="wsqid: true, wsqdimensions: true, click: toggleCollapse, css: cssClasses, wsqstyleheight: {obj: dimensions}">Bottom Collasper</div>
</script>
<script type="text/html" id="layoutLeftCollapser">
    <div class="layout-horizontal" data-bind="wsqid: true, wsqdimensions: true, click: toggleCollapse, css: cssClasses, wsqstyleheight: {obj: dimensions}, wsqstylewidth: {obj: dimensions}"></div>
</script>
<script type="text/html" id="layoutRightCollapser">
    <div class="layout-horizontal" data-bind="wsqid: true, wsqdimensions: true, click: toggleCollapse, css: cssClasses, wsqstyleheight: {obj: dimensions}, wsqstylewidth: {obj: dimensions}"></div>
</script>
<body style="height:100%; width:100%">
	<div data-bind="template: 'app'"></div>
	<script type="text/javascript">
		var app = new wsq.app(template, data);
		ko.applyBindings(app);
	</script>
</body>
</html>
