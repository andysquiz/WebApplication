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
	<script src="scripts/elementExtenders.js" type="text/javascript"></script>
	<script src="scripts/vm.js" type="text/javascript"></script>
    <script src="scripts/utils.js" type="text/javascript"></script>
	<script src="scripts/dimensions.js" type="text/javascript"></script>
    <script src="scripts/provider.js" type="text/javascript"></script>
    <script src="scripts/expressions.js" type="text/javascript"></script>
    <script src="scripts/functions.js" type="text/javascript"></script>
	<script src="scripts/canvas.js" type="text/javascript"></script>
    <script src="scripts/draggableExtender.js" type="text/javascript"></script>
    <script src="scripts/droppableExtender.js" type="text/javascript"></script>
	<script src="scripts/mouseExtender.js" type="text/javascript"></script>
	<script src="scripts/canvasExtender.js" type="text/javascript"></script>
    <script src="vms/webapp.js" type="text/javascript"></script>
    <script src="vms/layout.js" type="text/javascript"></script>
    <script src="vms/fillpanel.js" type="text/javascript"></script>
	<script src="vms/expander.js" type="text/javascript"></script>
	<script src="vms/repeater.js" type="text/javascript"></script>
    <script src="vms/datatab.js" type="text/javascript"></script>
    <script src="vms/datapanel.js" type="text/javascript"></script>
    <script src="vms/label.js" type="text/javascript"></script>
    <script src="vms/fluidpanel.js" type="text/javascript"></script>
    <script src="vms/designerrootcontainer.js" type="text/javascript"></script>
    <script src="vms/designerpanel.js" type="text/javascript"></script>
	<script src="vms/workflowcanvas.js" type="text/javascript"></script>
    <script src="vms/form.js" type="text/javascript"></script>
	<script src="vms/workflow.js" type="text/javascript"></script>
	<script src="vms/startactivity.js" type="text/javascript"></script>
    <script src="vms/backgroundactivity.js" type="text/javascript"></script>
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
				height: "40px",
				minHeight: "40px",
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
							type: wsq.controls.fluidpanel,
							classes: {
								header: true
							},
							controls: [{
								type: wsq.controls.label,
								text: "$.name"
							}]
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
					type: wsq.controls.fillpanel,
					data: "$.bottom",
                    controls: [{
                    	type: wsq.controls.datapanel,
                    	dataSource: "controlitem(\"#.selectedFile\", \"$.template.infoDataTemplate\")",
                    	controlsPath: "$.template.controls",
                    	classes: {
                    		datapanel: true
                    	}
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
			            controls: [
                        {
                            type: wsq.controls.fluidpanel,
                            classes: {
                                "banner": true
                            },
                            controls: [{
                                type: wsq.controls.label,
                                text: "indirectval(\"#.selectedFile\",\"childTypes\")"
                            }]
                        },
                        {
							type: wsq.controls.repeater,
							repeatSource: "switchval(\"#.selectedFile\",\"type\",\"#.dragSet\")",
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
										    draggable: true,
										    dragData: {
                                                type: "$.type",
                                                text: "$.name"
                                            },
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
									selectedContent: "#.selectedFile",
									classes: {
										dataTabTop: true
									},
									scrollLeftClasses:{
										dataTabScroll: true,
										dataTabNoScroll: false
									},
									scrollRightClasses: {
										dataTabScroll: true,
										dataTabNoScroll: false
									},
									right: {
										width: "50px"
									}
								}]
							},
							middle: {
								controls: [{
									type: wsq.controls.datapanel,
									dataSource: "#.selectedFile",
									controlsPath: "$.template.body.controls",
									classes: {
										datapanel: true,
                                        content: true
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
		selectedFile: ko.observable(null),
		templates: {
			formDataTab: {
				type: wsq.controls.form,
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
						type: wsq.controls.designerrootcontainer
					}]
				},
				infoDataTemplate: "formInfoData"
			},
			workflowDataTab: {
				type: wsq.controls.workflow,
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
						type: wsq.controls.workflowcanvas
					}]
				},
				infoDataTemplate: "workflowInfoData"
			},
			workflowInfoData: {
				type: "workflowinfo",
				controls: [{
					type: wsq.controls.label,
					text: "\"x:\" + $.mousePosition.x"
				},
                {
                	type: wsq.controls.label,
                	text: "\"y:\" + $.mousePosition.y"
                }]
			},
			formInfoData: {
				type: "forminfo",
				controls: [{
					type: wsq.controls.label,
					text: "$.hoverControl"
				}]
			}
		},
		dragSet: {
			form: "$.controlGroups",
			workflow: "$.activityGroups"
		}
	}

    var data = {
    	name: "Designer Test Application",
    	version: ko.observable("0.0.1"),
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
    			name: "Panel",
                type: "designerpanel"
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
		activityGroups: ko.observableArray([{
			name: "Basic",
			controls: ko.observableArray([{
				name: "Start activity",
				type: "startactivity"
            },
            {
                name: "Background activity",
                type: "backgroundactivity"
            }])
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

   function addwf() {
   	var name = prompt("name");
   	var desc = prompt("description");
   	data.workflows.push({ name: name, description: desc });
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
    <div data-bind="css: cssClasses, foreach: controls, wsqid: true, wsqdimensions: true, wsqdraggable: draggable">
        <!-- ko template: viewTemplate -->
        <!-- /ko -->
    </div>
</script>
<script type="text/html" id="designerrootcontainer">
    <div data-bind="wsqmouseover: hover">
        <div>DESIGNER ROOT CONTAINER!</div>
        <div class="designer-container">
            <div data-bind="foreach: controls, wsqid: true, wsqdimensions: true">
                <!-- ko template: viewTemplate -->
                <!-- /ko -->
            </div>
            <div data-bind="wsqdroppable: true" class="designer-container-drop"></div>
        </div>
    </div>
</script>
<script type="text/html" id="designerpanel">
    <div data-bind="wsqmouseover: hover">
        <div>DESIGNER PANEL!</div>
        <div class="designer-container">
            <div data-bind="foreach: controls, wsqid: true, wsqdimensions: true">
                <!-- ko template: viewTemplate -->
                <!-- /ko -->
            </div>
            <div data-bind="wsqdroppable: true" class="designer-container-drop"></div>
        </div>
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
		<div class="tab-page-container" data-bind="wsqstyleheight: {obj: dimensions}, wsqstylewidth: {obj: right.dimensions}">            <div class="tab-page-left" data-bind="click: scrollLeft, css: scrollLeftClasses">&lt;</div><div class="tab-page-right" data-bind="click: scrollRight, css: scrollRightClasses">&gt;</div>
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
<script type="text/html" id="fillcanvas">
    <canvas id="test" data-bind="css: cssClasses, wsqstyleheight: {obj: dimensions}, wsqstylewidth: {obj: dimensions}, wsqelementheight: {obj: dimensions}, wsqelementwidth: {obj: dimensions}, wsqmouseposition: true, wsqcanvas2d: true, wsqdroppable: true, wsqdrag: true" style="margin: 0; padding: 0; border: 1px solid #999999"></canvas>
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
	<button onclick="addwf()" style="padding:0; line-height: normal">Add Workflow</button>
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
