import React from 'react';
import './no_content.scss';

const NoContentTab = () => <div className="d-flex justify-content-center align-items-center no-content">
    <div className="text-center">
        <div className="form-group">
            <i className="fa fa-file-o" aria-hidden="true"></i>
        </div>
        <h6>No content to show</h6>
    </div>
</div>

export default NoContentTab;
