<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="WebApplication._default" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" style="height:100%; width:100%">
<head runat="server">
    <title>Web Application</title>
	<script src="scripts/jquery-1.7.2.js" type="text/javascript"></script>
	<script src="scripts/knockout-2.1.0.debug.js" type="text/javascript"></script>
	<script src="scripts/idExtender.js" type="text/javascript"></script>
	<script src="scripts/dimensionsExtender.js" type="text/javascript"></script>
	<script src="scripts/vm.js" type="text/javascript"></script>
    <script src="scripts/utils.js" type="text/javascript"></script>
	<script src="scripts/dimensions.js" type="text/javascript"></script>
    <script src="scripts/provider.js" type="text/javascript"></script>
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
            invertTopBottom: "invertTopBottom",
            invertLeftRight: "invertLeftRight",
            minWidth: "400px",
            minHeight: "200px",
            top: {
                height: "50px",
                minHeight: "100px",
                collapsible: false,
                collapsed: false,
                controls: [{
                    type: wsq.controls.fluidpanel,
                    controls: [{
                        type: wsq.controls.label,
                        text: "text"
                    }],
                    data: "top"
                }]
            },
            bottom: {
                height: "30px",
                collapsible: false,
                collapsed: false,
                controls: [{
                    type: wsq.controls.fluidpanel,
                    data: "bottom",
					controls: [{
                        type: wsq.controls.label,
                        viewTemplate: "label",
                        text: "text"
                    }],
                }]
            },
            left: {
                width: "0",
                collapsible: false,
                collapsed: true,
                controls: []
            },
            right: {
                width: "0",
                collapsible: false,
                collapsed: true,
                controls: []
            },
            middle: {
                controls: [{
                    type: wsq.controls.layout,
					invertTopBottom: "invertTopBottom",
					invertLeftRight: "invertLeftRight",
					top: {
						collapsible: false,
						collapsed: true,
						height: "0",
						controls: []
					},
					bottom: {
						collapsible: false,
						collapsed: true,
						height: "0",
						controls: []
					},
					left: {
						collapsible: true,
						collapsed: false,
						width: "100px",
						controls: [{
							type: wsq.controls.fluidpanel,
							controls: [{
								type: wsq.controls.label,
								viewTemplate: "label2",
								text: "text"
							}]
						}],
						data: "left"
					},
					right: {
						collapsible: true,
						collapsed: false,
						width: "300px",
						controls: []
					},
					middle: {
						controls: []
					},
					topCollapser: {
					    viewTemplate: "layoutTopCollapser"
					},
					bottomCollapser: {
						viewTemplate: "layoutBottomCollapser"
					},
					leftCollapser: {
						viewTemplate: "layoutLeftCollapser",
						width: "20px"
					},
					rightCollapser: {
						viewTemplate: "layoutRightCollapser",
						width: "20px"
					}
                }]
            },
            topCollapser: {
                viewTemplate: "layoutTopCollapser"
            },
            bottomCollapser: {
                viewTemplate: "layoutBottomCollapser"
            },
			leftCollapser: {
				viewTemplate: "layoutLeftCollapser",
                width: "20px"
			},
            rightCollapser: {
				viewTemplate: "layoutRightCollapser",
                width: "20px"
			}
        }]
    }

    var data = {
        name: "Test app",
        version: "0.0.1",
        invertTopBottom: ko.observable(false),
        invertLeftRight: ko.observable(false),
        top: {
            text: "top",
            collapsed: ko.observable(false)
        },
        bottom: {
            text: "bottom"
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
				<div class="top clear" data-bind="style: {height: top.dimensions.height }, foreach: top.controls">
					<!-- ko template: viewTemplate --><!-- /ko -->
				</div>
			<!-- /ko -->
			<!-- ko if: top.collapsible -->
				<!-- ko template: {name: topCollapser.viewTemplate, data: topCollapser} --><!-- /ko -->
			<!-- /ko -->
		<!-- /ko -->
		<!-- ko if: invertTopBottom() -->
			<!-- ko if: !bottom.collapsed() -->
				<div class="bottom clear" data-bind="style: {height: bottom.dimensions.height }, foreach: bottom.controls">
					<!-- ko template: viewTemplate --><!-- /ko -->
				</div>
			<!-- /ko -->
			<!-- ko if: bottom.collapsible -->
				<!-- ko template: {name: bottomCollapser.viewTemplate, data: bottomCollapser} --><!-- /ko -->
			<!-- /ko -->
		<!-- /ko -->
        <div data-bind="style: { height: middle.dimensions.height, width: dimensions.width}">
            <!-- ko if: !invertLeftRight() -->
				<!-- ko if: !left.collapsed() -->
					<div class="left layout-horizontal" data-bind="style: { height: middle.dimensions.height, width: left.dimensions.width }, foreach: left.controls">
						<!-- ko template: viewTemplate --><!-- /ko -->
					</div>
				<!-- /ko -->
				<!-- ko if: left.collapsible -->
					<!-- ko template: {name: leftCollapser.viewTemplate, data: leftCollapser} --><!-- /ko -->
				<!-- /ko -->
			<!-- /ko -->
			<!-- ko if: invertLeftRight() -->
				<!-- ko if: !right.collapsed() -->
					<div class="right layout-horizontal" data-bind="style: { height: middle.dimensions.height, width: right.dimensions.width }, foreach: right.controls">
						<!-- ko template: viewTemplate --><!-- /ko -->
					</div>
				<!-- /ko -->
				<!-- ko if: right.collapsible -->
					<!-- ko template: {name: rightCollapser.viewTemplate, data: rightCollapser} --><!-- /ko -->
				<!-- /ko -->
			<!-- /ko -->
            <div class="layout-horizontal" data-bind="style: { height: middle.dimensions.height, width: middle.dimensions.width }, foreach: middle.controls">
				<!-- ko template: viewTemplate --><!-- /ko -->
			</div>
			<!-- ko if: !invertLeftRight() -->
				<!-- ko if: right.collapsible -->
					<!-- ko template: {name: rightCollapser.viewTemplate, data: rightCollapser} --><!-- /ko -->
				<!-- /ko -->
				<!-- ko if: !right.collapsed() -->
					<div class="right layout-horizontal" data-bind="style: { height: middle.dimensions.height, width: right.dimensions.width }, foreach: right.controls">
						<!-- ko template: viewTemplate --><!-- /ko -->
					</div>
				<!-- /ko -->
			<!-- /ko -->
			<!-- ko if: invertLeftRight() -->
				<!-- ko if: left.collapsible -->
					<!-- ko template: {name: leftCollapser.viewTemplate, data: leftCollapser} --><!-- /ko -->
				<!-- /ko -->
				<!-- ko if: !left.collapsed() -->
					<div class="left layout-horizontal" data-bind="style: { height: middle.dimensions.height, width: left.dimensions.width }, foreach: left.controls">
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
				<div class="bottom clear" data-bind="style: {height: bottom.dimensions.height }, foreach: bottom.controls">
					<!-- ko template: viewTemplate --><!-- /ko -->
				</div>
			<!-- /ko -->
		<!-- /ko -->
		<!-- ko if: invertTopBottom() -->
			<!-- ko if: top.collapsible -->
				<!-- ko template: {name: topCollapser.viewTemplate, data: topCollapser} --><!-- /ko -->
			<!-- /ko -->
			<!-- ko if: !top.collapsed() -->
				<div class="top clear" data-bind="style: {height: top.dimensions.height }, foreach: top.controls">
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
	<button onclick="invert()">invert</button>
</script>
<script type="text/html" id="label2">
    <span data-bind="text: text, wswid: true, wsqdimensions: true"></span>
	<button onclick="invert2()">invert</button>
</script>
<script type="text/html" id="layoutTopCollapser">
    <div class="topCollapser clear" data-bind="wsqid: true, wsqdimensions: true, click: toggleCollapse">Top Collapser</div>
</script>
<script type="text/html" id="layoutBottomCollapser">
    <div class="bottomCollapser clear" data-bind="wsqid: true, wsqdimensions: true, click: toggleCollapse">Bottom Collasper</div>
</script>
<script type="text/html" id="layoutLeftCollapser">
    <div class="leftCollapser layout-horizontal" data-bind="wsqid: true, wsqdimensions: true, style: {height: $parent.middle.dimensions.height, width: dimensions.width}, click: toggleCollapse">l</div>
</script>
<script type="text/html" id="layoutRightCollapser">
    <div class="rightCollapser layout-horizontal" data-bind="wsqid: true, wsqdimensions: true, style:{height: $parent.middle.dimensions.height, width: dimensions.width}, click: toggleCollapse">r</div>
</script>
<body style="height:100%; width:100%">
	
	<div data-bind="template: 'app'"></div>
	<script type="text/javascript">
		var app = new wsq.app(template, data);
		ko.applyBindings(app);
	</script>
</body>
</html>
