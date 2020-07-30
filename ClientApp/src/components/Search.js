import React, { Component } from 'react';
import {
    Button,
    Input, FormGroup,Form
} from "reactstrap";
class Search extends Component {
    render() {
        return (
            <>
                <Form className="form-inline">
                    <FormGroup>
                        <Input placeholder="Search..." value={this.props.valueSearch} onChange={(event) => this.props.handleSearch(event.target.value)} />
                        
                      
                      
                    </FormGroup>
                    <Button className="btn btn-control" color="info" onClick={() => this.props.handleSearch('')}>Tất cả</Button>
               </Form>
            </>
        )
    }
}

export default Search;