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
    <script src="scripts/functions.js" type="text/javascript"></script>
    <script src="vms/webapp.js" type="text/javascript"></script>
    <script src="vms/layout.js" type="text/javascript"></script>
    <script src="vms/fillpanel.js" type="text/javascript"></script>
	<script src="vms/expander.js" type="text/javascript"></script>
	<script src="vms/repeater.js" type="text/javascript"></script>
    <script src="vms/datatab.js" type="text/javascript"></script>
    <script src="vms/datapanel.js" type="text/javascript"></script>
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
					"app-top": false,
					"app-top-inverted": true
				},
				controls: [{
					type: wsq.controls.layout,
					right: {
						width: "100px",
						classes: {
							"app-version": false
						},
						controls: [{
							type: wsq.controls.label,
							text: "\"version \" + $.version"
						}]
					},
					middle: {
						controls: [{
							type: wsq.controls.label,
							viewTemplate: "label2",
							text: "$.name"
						}]
					}
				}]
			},
			bottom: {
				height: "30px",
				classes: {
					"app-bottom": false,
					"app-bottom-inverted": true
				},
				controls: [{
					type: wsq.controls.fluidpanel,
					data: "$.bottom",
					controls: [{
						type: wsq.controls.label,
						text: "join(1,2,3)"
					}]
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
							"app-left": false,
							"auto": false
						},
						controls: [{
							type: wsq.controls.repeater,
							repeatSource: "$.controlGroups",
							controls: [{
								type: wsq.controls.expander,
								collapsed: false,
								selectorClasses: {
									"expander-header-selector-uncollapsed": false,
									"expander-header-selector-collapsed": true
								},
								contentClasses: {
									"expander-content": true
								},
								headerClasses: {
									"expander-header": "all"
								},
								headerControls: [{
									type: wsq.controls.label,
									text: "$.name"
								}],
								contentControls: [{
									type: wsq.controls.repeater,
									repeatSource: "$.controls",
									controls: [{
										type: wsq.controls.expander,
										collapsed: true,
										selectorClasses: {
											"expander-header-selector-uncollapsed": false,
											"expander-header-selector-collapsed": true
										},
										contentClasses: {
											"expander-content": true
										},
										headerClasses: {
											"expander-header2": "all"
										},
										headerControls: [{
											type: wsq.controls.label,
											text: "test"
										}],
										contentControls: [{
											type: wsq.controls.fluidpanel,
											controls: [{
												type: wsq.controls.label,
												text: "$.name"
											}]
										}]
									}]
								}]
							}]
						}]
					},
					leftCollapser: {
						classes: {
							"app-left-collapser": false,
							"app-left-collapser-collapsed": true
						}
					},
					middle: {
						controls: [{
							type: wsq.controls.layout,
							top: {
								height: "24px",
								classes: {
									"content-top": false
								},
								controls: [{
									type: wsq.controls.datatab,
									repeatSource: "join(controlitems($.forms, #.templates.formDataTab),controlitems($.workflows, #.templates.workflowDataTab))",
									selectedItem: "$root.selectedFile",
									classes: {
										dataTabTop: true
									},
									scrollLeftClasses:{

									},
									scrollRightClasses: {

									},
									right: {
										width: "45px"
									}
								}]
							},
							middle: {
								controls: [{
									type: wsq.controls.datapanel,
									dataSource: "$root.selectedFile",
									classes: {
										datapanel: true
									}
								}]
							}
						}]
					}
				}]
			}
		}]
	}

    var formData = {
        templates: {
            formDataTab: {
                type: "form",
                classes: {
                    datatabtop: "all",
                    selected: true
                },
                header: {
                    controls: [{
                        type: wsq.controls.label,
                        text: "$.name"
                    }]
                },
                body: {
                    controls: [{
                        type: wsq.controls.label,
                        text: "$.description"
                    }]
                }
            },
            workflowDataTab: {
                type: "workflow",
                classes: {
                    datatabtop: "all",
                    selected: true
                },
                header: {
                    controls: [{
                        type: wsq.controls.label,
                        text: "$.name"
                    }]
                },
                body: {
                    controls: [{
                        type: wsq.controls.label,
                        text: "\"w \" + $.description"
                       },
					{
						type: wsq.controls.label,
						text: "template test"
					}
					]
                }
            }
        }
    }

    var data = {
    	name: "Designer Test Application",
    	version: ko.observable("0.0.1"),
        selectedFile: ko.observable(null),
    	forms: ko.observableArray([{
    	    name: "f1",
            description: "form 1"
    	},
		{
		    name: "f2",
		    description: "form 2"
		}]),
    	workflows: ko.observableArray([{
    		name: "w1",
            description: "workflow 1"
    	},
		{
			name: "w2",
            description: "workflow 2"
		}]),
    	invertTopBottom: ko.observable(false),
    	invertLeftRight: ko.observable(false),
    	controlGroups: ko.observableArray([{
    		name: "Panels",
    		controls: ko.observableArray([{
    			name: "Header Panel"
    		},
			{
				name: "Footer Panel"
			}])
    	},
        {
        	name: "New Panels",
        	controls: ko.observableArray([{
        		name: "Another Panel"
        	},
			{
				name: "Posey's Panel"
			}])
        },
		{
			name: "Input",
			controls: ko.observableArray([{
				name: "Text Box"
			},
			{
				name: "Check Box"
			},
			{
				name: "Radio Button"
			}])
		},
		{
			name: "Flow"
		}]),
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

	function addgroup() {
		var name = prompt("name");
		var obj = { name: name, controls: ko.observableArray([{name: "dynamic test"}])};
		data.controlGroups.push(obj);
	}

	function popgroup() {
		data.controlGroups.pop();
}

function addform() {
    var name = prompt("name");
    var desc = prompt("description");
    data.forms.push({ name: name, description: desc });
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
<script type="text/html" id="datatab">
	<div data-bind="wsqid: true, wsqdimensions: true, wsqstyleheight: {obj: dimensions}, wsqstylewidth: {obj: dimensions}">
		<div style="display: inline-block; overflow: hidden" data-bind="wsqstyleheight: {obj: dimensions}, wsqstylewidth: {obj: left.dimensions}">
			<ul style="white-space: nowrap; " class="datatab" data-bind="foreach: tabs, wsqstyleheight: {obj: dimensions}, wsqstylewidth: {value: left.actualWidth}, style: {'marginLeft': scrollPosition}">
				<li data-bind="wsqdimensionssingle: parent.getActualWidth, css: cssClasses, click: click">
					<!-- ko foreach:controls -->
						<!-- ko template: viewTemplate --><!-- /ko -->
					<!-- /ko -->
				</li>
			</ul>
		</div>
		<div class="tab-page-container" data-bind="wsqstyleheight: {obj: dimensions}, wsqstylewidth: {obj: right.dimensions}">
            <div data-bind="click: scrollRight, css: cssClasses" class="tab-page-right"></div><div data-bind="click: scrollLeft, css: cssClasses" class="tab-page-left"></div>
		</div>
		<div class="clear"></div>
	</div>
</script>
<script type="text/html" id="fillpanel">
    <div data-bind="foreach: controls, css: cssClasses, wsqstyleheight: {obj: dimensions}, wsqstylewidth: {obj: dimensions}">
        <!-- ko template: viewTemplate -->
        <!-- /ko -->
    </div>
</script>
<script type="text/html" id="datapanelitem">
    <div data-bind="foreach: controls">
        <!-- ko template: viewTemplate -->
        <!-- /ko -->
    </div>
</script>
<script type="text/html" id="datapanel">
    <div data-bind="css: cssClasses, wsqstyleheight: {obj: dimensions}, wsqstylewidth: {obj: dimensions}">
        <!-- ko template: {name: "datapanelitem", data: control} --><!-- /ko -->
    </div>
</script>
<script type="text/html" id="expander">
    <div class="expander">
		<div>
			<div data-bind="click: toggleCollapsed, css: cssSelectorClasses" class="expander-header-selector"></div>
			<div data-bind="foreach: headerControls, css: cssHeaderClasses">
				<!-- ko template: viewTemplate -->
				<!-- /ko -->
			</div>
		</div>
        <!-- ko if: !collapsed() -->
			<div data-bind="foreach: contentControls, css: cssContentClasses">
				<!-- ko template: viewTemplate -->
				<!-- /ko -->
			</div>
        <!-- /ko -->
	</div>
</script>
<script type="text/html" id="repeater">
    <!-- ko foreach: items -->
		<!-- ko foreach: controls -->
			<!-- ko template: viewTemplate -->
			<!-- /ko -->
		<!-- /ko -->
	<!-- /ko -->
</script>
<script type="text/html" id="label">
    <span data-bind="text: text"></span>
</script>
<script type="text/html" id="label2">
    <span data-bind="text: text"></span>
	<button onclick="addgroup()" style="padding:0; line-height: normal">Add Group</button>
	<button onclick="popgroup()" style="padding:0; line-height: normal">Pop Group</button>
    <button onclick="addform()" style="padding:0; line-height: normal">Add Form</button>
</script>
<script type="text/html" id="layoutTopCollapser">
    <div class="clear" data-bind="click: toggleCollapse, css: cssClasses, wsqstyleheight: {obj: dimensions}">Top Collapser</div>
</script>
<script type="text/html" id="layoutBottomCollapser">
    <div class="clear" data-bind="click: toggleCollapse, css: cssClasses, wsqstyleheight: {obj: dimensions}">Bottom Collasper</div>
</script>
<script type="text/html" id="layoutLeftCollapser">
	<div class="layout-horizontal" data-bind="click: toggleCollapse, css: cssClasses, wsqstyleheight: {obj: dimensions}, wsqstylewidth: {obj: dimensions}"></div>
</script>
<script type="text/html" id="layoutRightCollapser">
    <div class="layout-horizontal" data-bind="click: toggleCollapse, css: cssClasses, wsqstyleheight: {obj: dimensions}, wsqstylewidth: {obj: dimensions}"></div>
</script>
<body style="height:100%; width:100%">
	<div data-bind="template: 'app'"></div>
	<script type="text/javascript">
		var app = new wsq.app(template, data);
		ko.applyBindings(app);
	</script>
</body>
</html>
