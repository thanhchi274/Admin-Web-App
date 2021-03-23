import React from 'react'
import { Link } from "react-router-dom";
import { Collapse} from "reactstrap";
export default function ProductItemsComponent() {
          return (
                    <div className="categories-group-card">
                    <Link to="#" className={ "categories-group-list accordian-bg-products"}>
                        <i className="mdi mdi-dumbbell font-size-16 align-middle mr-2"></i> Fitness
                        <i className={ "mdi mdi-minus float-right accor-minus-icon"}></i>
                    </Link>
                    <Collapse 
                    // isOpen={this.state.fitness} 
                    id="collapseFour">
                        <div>
                            <ul className="list-unstyled categories-list mb-0">
                                <li><Link to="#"><i className="mdi mdi-circle-medium mr-1"></i> Gym equipment</Link></li>
                                <li><Link to="#"><i className="mdi mdi-circle-medium mr-1"></i> Yoga mat</Link></li>
                                <li><Link to="#"><i className="mdi mdi-circle-medium mr-1"></i> Dumbbells</Link></li>
                                <li><Link to="#"><i className="mdi mdi-circle-medium mr-1"></i> Protein supplements</Link></li>
                            </ul>
                        </div>
                    </Collapse>
                </div>
          )
}
