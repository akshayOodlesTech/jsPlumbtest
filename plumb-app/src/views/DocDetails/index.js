import React from 'react';
import $ from 'jquery';
import '../../css/font.css';
import '../../css/jsplumbtoolkit-defaults.css';
import '../../css/main.css';
import '../../css/jsplumbtoolkit-demo.css';
import '../../css/demo.css';
import Images from '../../assets/asset_imports';
import Navbar from '../../components/Navbar';
import './documentDetails.module.scss'
import { fetchAuthToken } from '../../utils/Helpers';
import axios from 'axios';
import {CircularProgress,Backdrop,withStyles} from '@material-ui/core';

const styles = theme => ({
  backdrop: {
    zIndex: 10,
    color: '#fff',
  },
});

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      showInvoiceDetails: false,
      showAmounts:false,
      pageValue:1,
      isLoading: false,
      previewImg:'',
      invoiceImage : '',
      invoiceDetailsMap : '',
      boundsData:'',
      leftSourceId:1,
      leftSourceIndex:0,
      authenticationToken:''
    }
  }

  componentDidMount() {
     this.fetchDocument();
  }

  fetchDocument = async() => {

    var authToken = await fetchAuthToken();
    
    this.setState({isLoading:true,authenticationToken:authToken});
    let { doc_id } = this.props.match.params;
    let reqBody = {
      file_id : doc_id
    }
    
    //To fetch the Invoice image
    axios({ method: 'post',url:`${process.env.REACT_APP_BASE_URL}/open_doc/`,data:reqBody,headers: {'Authorization': `Bearer ${authToken}`}})
      .then(res => {
        this.setState({isLoading:false});
        const img = res.data;
        console.log("temaaaam",img)

        // var tempArr = img.split("/");
        // tempArr = tempArr.splice(3,tempArr.length);
        
        // this.getDocumentData();
        // let previewImg = `${process.env.REACT_APP_BASE_URL}/${tempArr.join("/")}`;
        this.setState({previewImg:res.data.file_link}, () => {
          console.log("previewImage",this.state.previewImg)  
          this.getDocumentData();
        })
      })
      .catch(error => {
        if (error.response) {
        console.error("canvaDOCERR::",error.response);
        // this.setState({errorMsg:error.response.data.non_field_errors[0]});
        }
        this.setState({isLoading:false});
      })
    }


    submitInvoice = async() => {      
      this.setState({isLoading:true});
      let reqBody = {
        "file_id" : this.props.match.params.doc_id,
        "data":{"entities":this.state.boundsData}
      }

      console.log("QQQQQQ",this.state.boundsData)
      
      //To fetch the Invoice image
      axios({ method: 'post',url:`${process.env.REACT_APP_BASE_URL}/update_keys/`,
      data:reqBody,
      headers: {'Authorization': `Bearer ${this.state.authenticationToken}`}})
        .then(res => {
          this.setState({isLoading:false});
          const img = res.data;
          console.log("submtiInvice",img)
        })
        .catch(error => {
          if (error.response) {
          console.error("submitErrr::",error.response);
          // this.setState({errorMsg:error.response.data.non_field_errors[0]});
          }
          this.setState({isLoading:false});
        })
      }

    getDocumentData = async() => {
      console.warn("opopopopopo")
      let authToken = await fetchAuthToken();

      this.setState({isLoading:true});

      let { doc_id } = this.props.match.params;
      
      let reqBody = {
        file_id : doc_id
      }
      //-------------------- fetch google vision response api ---------------------------------
      axios({ method: 'post',url:`${process.env.REACT_APP_BASE_URL}/extract_data/`,data:reqBody,headers: {'Authorization': `Bearer ${authToken}`}})
      .then(res => {
        this.setState({isLoading:false});
        console.log("Test 1 "+JSON.stringify(res));
        this.setState({boundsData:res.data.data.entities,invoiceBounds:res.data.data.entities},()=>{
          this.setJsPlumbCanvas(this);
        })

      })
      .catch(error => {
        if (error.response) {
        console.error("daccERR::",error.response);
        // this.setState({errorMsg:error.response.data.non_field_errors[0]});
        }
        this.setState({isLoading:false});
      })
    }

  setJsPlumbCanvas = (self) => {
    window.jsPlumb.ready(function () {


      var offsetCalculators = {
        "RECT":function(el, parentOffset) {
            // var x = parseInt(el.attr("x"), 10),
            //     y = parseInt(el.attr("y"), 10);
            var x = el[0].getBoundingClientRect().x,
                y = el[0].getBoundingClientRect().y + (el[0].getBoundingClientRect().height / 2);
    
            // return {
            //     left: parentOffset.left + x,
            //     top: parentOffset.top + y
            // };
            return {
              left: x,
              top: y
            };
    
        }
      };
        
      // custom size calculators for SVG shapes.
      var sizeCalculators = {
        "RECT":function(el) {
            // var w = parseInt(el.attr("width"), 10),
            //     h = parseInt(el.attr("height"), 10);
            // var w = el[0].getBoundingClientRect().width,
            //     h = el[0].getBoundingClientRect().height;
            var w = 0,
                h = 0;
            return [ w, h ];
        }
      };
    
      // store original jsPlumb prototype methods for getOffset and size.
    var originalOffset = window.jsPlumbInstance.prototype.getOffset;
    var originalSize = window.jsPlumbInstance.prototype.getSize;
    
    window.jsPlumbInstance.prototype.getOffset = function(el) {
        var tn = el.tagName.toUpperCase();
        if (offsetCalculators[tn]) {
          console.log("Condition satisfied");
          return offsetCalculators[tn]($(el), $(el).parent().offset());
        }
        else
          return $(el).offset();
    };
    
    window.jsPlumbInstance.prototype.getSize = function(el) {
        var tn = el.tagName.toUpperCase();
        if (sizeCalculators[tn]) {
          return sizeCalculators[tn]($(el));
        }
        else
          return [ $(el).outerWidth(), $(el).outerHeight() ];
    };

      //Checked
      var instance = (window.jsp = window.jsPlumb.getInstance({
        // default drag options
          DragOptions: { cursor: "pointer", zIndex: 2000 },
          // the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
          // case it returns the 'labelText' member that we set on each connection in the 'init' method below.
          ConnectionOverlays: [
            [
              "Arrow",
              {
                location: 1,
                visible: true,
                width: 11,
                length: 11,
                id: "ARROW",
              },
            ],
            [
              "Label",
              {
                location: 0.1,
                id: "label",
                cssClass: "aLabel",
              },
            ],
          ],
          Container: "canvas",
      }));

      //Checked
      var basicType = {
        connector: "StateMachine",
        paintStyle: { stroke: "red", strokeWidth: 4 },
        hoverPaintStyle: { stroke: "blue" },
        overlays: ["Arrow"],
      };
      instance.registerConnectionType("basic", basicType);

      //Checked
      var connectorPaintStyle = {
          strokeWidth: 4,
          stroke: "red",
          joinstyle: "round",
          outlineStroke: "white",
          outlineWidth: 2,
      },
      connectorHoverStyle = {
        strokeWidth: 3,
        stroke: "#216477",
        outlineWidth: 5,
        outlineStroke: "white",
      },
      endpointHoverStyle = {
        fill: "#216477",
        stroke: "#216477",
      },
      sourceEndpoint = {
        endpoint: "Dot",
        paintStyle: {
          stroke: "transparent",
          fill: "transparent",
          radius: 7,
          strokeWidth: 1,
        },
        isSource: true,
        connector: [
          "Flowchart",
          { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true },
        ],
        connectorStyle: connectorPaintStyle,
        hoverPaintStyle: endpointHoverStyle,
        connectorHoverStyle: connectorHoverStyle,
        dragOptions: {},
        overlays: [
          [
            "Label",
            {
              location: [0.5, 1.5],
              label: "",
              cssClass: "endpointSourceLabel",
              visible: true,
            },
          ],
        ],
      },

      //Checked
      // the definition of target endpoints (will appear when the user drags a connection)
      targetEndpoint = {
        endpoint: "Dot",
        paintStyle: { fill: "transparent", radius: 7 },
        hoverPaintStyle: endpointHoverStyle,
        maxConnections: -1,
        dropOptions: { hoverClass: "hover", activeClass: "active" },
        isTarget: true,
        overlays: [
          [
            "Label",
            {
              location: [0.5, -0.5],
              label: "",
              cssClass: "endpointTargetLabel",
              visible: true,
            },
          ],
        ],
      }

      // var _addEndpoints = function (toId, sourceAnchors, targetAnchors) {
      //   for (var i = 0; i < sourceAnchors.length; i++) {
      //     var sourceUUID = toId + sourceAnchors[i];
      //     console.log("Left Node UUID " + sourceUUID);
      //     instance.addEndpoint(toId, sourceEndpoint, {
      //       anchor: sourceAnchors[i],
      //       uuid: sourceUUID,
      //     });
      //   }
      //   for (var j = 0; j < targetAnchors.length; j++) {
      //     var targetUUID = toId + targetAnchors[j];
      //     console.log("Right Node UUID " + targetUUID);
      //     instance.addEndpoint(toId, targetEndpoint, {
      //       anchor: targetAnchors[j],
      //       uuid: targetUUID,
      //     });
      //   }
      // };

      // var _setScrolling = function (toId, sourceAnchors, targetAnchors) {
        
      // };

      //To draw end points and maintain click event on nodes
      for(let i=0; i<self.state.boundsData.length; i++) {
        //For Left Node end points
        // _addEndpoints(`flowchartWindow${(2*i)+1}`, ["RightMiddle"], []);
        instance.addEndpoint(`rect${(2*i)+1}`, sourceEndpoint, {
            anchor: "RightMiddle",
            uuid: `rect${(2*i)+1}`,
          });
        //For Right Node end points
        // _addEndpoints(`flowchartWindow${(2*i)+2}`, [], ["LeftMiddle"]);
        instance.addEndpoint(`rect${(2*i)+2}`, sourceEndpoint, {
          anchor: "LeftMiddle",
          uuid: `rect${(2*i)+2}`,
        });
      }

      // instance.addEndpoint("rect1", sourceEndpoint, {
      //   anchor: "RightMiddle",
      //   uuid: "rect1",
      // });
      
      // instance.addEndpoint("rect2", targetEndpoint, {
      //   anchor: "LeftMiddle",
      //   uuid: "rect2",
      // });

      // instance.addEndpoint("rect3", targetEndpoint, {
      //   anchor: "RightMiddle",
      //   uuid: "rect3",
      // });

      // instance.addEndpoint("rect4", targetEndpoint, {
      //   anchor: "LeftMiddle",
      //   uuid: "rect4",
      // });

      // instance.connect({ uuids: ["rect1", "rect2"] });

      // instance.connect({ uuids: ["rect3", "rect4"] });


      var leftSourceClickedID = 0;
      var rightSourceClickedID = 0;
      var connection;
      for(let i=0; i<self.state.boundsData.length; i++) {

        //Set click event on Left Nodes
        $(`#source${(2*i)+1}`).click(() => {
          leftSourceClickedID = (2*i)+1;
          self.setState({leftSourceId:(2*i)+1,leftSourceIndex:i})
          console.log("I am left clicked " + leftSourceClickedID);
          if(connection) { 
            instance.deleteConnection(connection);
          }
          // connection = instance.connect({ uuids: [`flowchartWindow${leftSourceClickedID}RightMiddle`, `flowchartWindow${leftSourceClickedID+1}LeftMiddle`] });
          connection = instance.connect({ uuids: [`rect${leftSourceClickedID}`, `rect${leftSourceClickedID+1}`] });
        });

        //Set click event on Right Nodes
        $(`#rect${(2*i)+2}`).click(() => {
          console.log("TargetClicked!!!",i)
          rightSourceClickedID = (2*i)+2;

          const items = [...self.state.boundsData];
          const targetItems = [...self.state.invoiceBounds];

          console.warn("jjjjjj",items[i])
          console.warn("opopopop",self.state.leftSourceId)
          console.warn("tititit",items[i].value)
          items[self.state.leftSourceIndex].value = targetItems[i].value;
          items[self.state.leftSourceIndex]['new_key'] = targetItems[i].value;

          console.log("ERERE",items)
          self.setState({boundsData:items})

          // const j = items[i]
          

          // items[CompanyName][j].Qty = e.target.value;
          // items[CompanyName][j].TotalPrice = e.target.value * items[CompanyName][j].Price;
        
          // this.setState({
          //    myrecords: items
          //  });


          if(connection) { 
            instance.deleteConnection(connection);
          }
          // connection = instance.connect({ uuids: [`flowchartWindow${(2*i)+1}RightMiddle`, `flowchartWindow${(2*i)+2}LeftMiddle`] });
          connection = instance.connect({ uuids: [`rect${self.state.leftSourceId}`, `rect${(2*i)+2}`] }); 
        });
      }

      //Handle Left Window Scrolling
      var leftPreviousScrollValue = 0;
      document.getElementById('form_content').addEventListener("scroll", function() {
        var leftScrollValue = document.getElementById("form_content").scrollTop;

        for(let i=0; i<self.state.boundsData.length; i++) {
          console.log("self..")
          var leftElement = document.getElementById(`rect${(2*i)+1}`);
          var leftElementTop = leftElement.offsetTop
          leftElement.style.top = `${leftElementTop + leftPreviousScrollValue - leftScrollValue}px`;
          instance.revalidate(leftElement);
        };
        leftPreviousScrollValue = leftScrollValue
      });

      //Handle Right Window Scrolling
      var rightPreviousScrollValue = 0;
      document.getElementById('image-div').addEventListener("scroll", function() {
        var rightScrollValue = document.getElementById("form_content").scrollTop;

        for(let i=0; i<self.state.boundsData.length; i++) {
          var rightElement = document.getElementById(`rect${(2*i)+2}`);
          if(rightElement){
            var rightElementTop = rightElement.offsetTop
            rightElement.style.top = `${rightElementTop + rightPreviousScrollValue - rightScrollValue}px`;
            instance.revalidate(rightElement);
          }
         
        };

        // var rightElement = document.getElementById(`rect2`);
        //   var rightElementTop = rightElement.offsetTop
        //   rightElement.style.top = `${rightElementTop + rightPreviousScrollValue - rightScrollValue}px`;
        //   instance.revalidate(rightElement);

        rightPreviousScrollValue = rightScrollValue
      });

        var mobiletop = $('#rect1').position().top;
        var scrollfactor = 18;

        document.getElementById('image-div').addEventListener("scroll", function() {
          
          var scrollValue = document.getElementById("image-div").scrollTop;
          var element1 = document.getElementById("rect1");
          var imgtop = mobiletop -  ((scrollValue - mobiletop)/scrollfactor);
          instance.revalidate(element1);
        });
      });
  }

  render(){

    const { classes } = this.props;
    return (
      <div className="App">
        <Backdrop className={classes.backdrop} open={this.state.isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <div data-demo-id="flowchart">
          <div class="mx-3">
            <div class="row">
              <div class="col-md-3 invoice-control">
                  <div style={{backgroundColor:'#011B3E',marginTop:'47px',borderRadius:'10px'}}>
                  <button type="button" class="btn reviewBtn" onClick={()=>this.props.history.goBack()}>← Reviewing</button>
                  <div className="invoiceTitle text-center py-1 my-3 container">Invoice _01.PDF</div>
                  <div className="accordion_head" onClick={()=>this.setState({showInvoiceDetails:!this.state.showInvoiceDetails})}>
                    <i class={this.state.showInvoiceDetails?"fa fa-caret-down":"fa fa-caret-up"} aria-hidden="true"></i>Invoice Details
                  </div> 
                  <div className={this.state.showInvoiceDetails?"collapse":"collapse show"} id="collapseExample">
                  <form id="form_content">
                    <div class="form-group">
           
                    {
                      //---------------------------- left side nodes ----------------------------------
                      this.state.boundsData && this.state.boundsData.map((item,index) => {
                        return(
                          <div 
                          id={`source${(2*index)+1}`} 
                           class="d-flex justify-content-start flowchart-demo">
                            <ul class="list-group">
                              <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent" >
                                {item.key}
                                <span>{item.value}</span>
                              </li>
                            </ul>
                            {/* <div class="window jtk-node jtk-managed jtk-draggable jtk-endpoint-anchor jtk-connected startnode"  
                            id={`flowchartWindow${(2*index)+1}`}
                              style={{right:'0px'}}>
                              <strong>1</strong><br/><br/>
                            </div> */}
                            <rect 
                              width="1%" 
                              height="1%" 
                              id={`rect${(2*index)+1}`}
                              class="annotation-symbols-bounding-box" 
                              ></rect>
                          </div>
                        );
                      })
                    }
                  </div>
                </form>
              </div>
              <div className="btn_group d-flex justify-content-center">
              <button type="button" class="btn">Want to Review</button>
              <button type="button" class="btn" onClick={()=>this.submitInvoice()}>Confirm</button>
              </div>
            </div>
          </div>
        <div class="col-md-9 flowchart-demo" id="image-div">
        
          <Navbar>
            <div className="col-md-5 form-inline page-count">
              <i class="fa fa-caret-left" aria-hidden="true" onClick={()=>this.setState({pageValue:this.state.pageValue-1})}></i>
                <small>{this.state.pageValue<10?`0${this.state.pageValue}`:this.state.pageValue}/15</small>
              <i class="fa fa-caret-right" aria-hidden="true" onClick={()=>this.setState({pageValue:this.state.pageValue+1})}></i>
              
              <div className="form-inline ml-5 justify-content-between" style={{width:'30%'}}>
                <span class="material-icons">query_builder</span>
                <span class="material-icons">delete</span>
                <span class="material-icons">cloud_download</span>
              </div>
            </div>
          </Navbar>

          {/* <img src={this.state.previewImg} width="800" height="1000" alt="invoice_image"/> */}
          <img _ngcontent-rvm-c29="" 
            class="img-shadow" 
            src={this.state.previewImg}
            style={{
              filter: 'brightness(1) contrast(1)', 
              display: 'initial', 
              backgroundColor: 'white', 
              left: '19.5994px', 
              top: '8px', 
              width: '921.801px',
              height: '1150px'}}/>

          {/* <svg style={{position:'absolute',left:'8px',top:'70px', width:'921.801px',height: '1150px'}}>
        <g id="bounding-boxes"> */}
        {/* <rect x="37.656425999999996%" y="12.21978%" width="33.959044000000006%" height="1.7142850000000016%" id="rect2" /> */}
        
         {/* <rect x="47.724688%" y="14.637363%" 
         width="9.442552%" 
         height="0.8351639999999994%" 
         id="rect4" 
         class="annotation-symbols-bounding-box" 
         ></rect>

         <rect x="68.31627%" 
         y="25.054947%" 
         width="4.664389999999996%" 
         height="0.7472509999999988%" 
         id="rect6" class="annotation-symbols-bounding-box"></rect> */}
        {/* </g>
      </svg> */}
      <svg style={{position:'absolute',left:'8px',top:'70px', width:'921.801px',height: '1150px'}}>
        <g id="bounding-boxes">
          {
            this.state.invoiceBounds && this.state.invoiceBounds.map((item,index)=>{
              return(
                // <div class="window jtk-node" id={`flowchartWindow${(2*index)+2}`}
                //   style={{
                //           top: item.boundingBoxes[0].y1*100+'%',
                //           left: item.boundingBoxes[0].x1*100+'%',
                //           width: (item.boundingBoxes[0].x2*100 - item.boundingBoxes[0].x1*100)+'%',
                //           height: (item.boundingBoxes[0].y4*100 - item.boundingBoxes[0].y1*100)+'%',
                //          }}>{item.key}<br /><br/>
                // </div>

                  <rect x= {item.boundingBoxes[0].x1*100+'%'} 
                  y = {item.boundingBoxes[0].y1*100+'%'} 
                  width={(item.boundingBoxes[0].x2*100 - item.boundingBoxes[0].x1*100)+'%'} 
                  height={(item.boundingBoxes[0].y4*100 - item.boundingBoxes[0].y1*100)+'%'} 
                  id={`rect${(2*index)+2}`} 
                  class="annotation-symbols-bounding-box"></rect>
              );
            })
          }
           </g>
      </svg>
        </div>
      </div>
    </div>
  </div>
</div>
    );
  }

}

export default  withStyles(styles)(App);

