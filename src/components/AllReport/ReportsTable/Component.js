import MultiSelect from '@/components/MultiSelect';
import React, { useState } from 'react';

const Component = () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    // Add more options as needed
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };
  return (
    <>
      <div className='admin-credit_table'>
        <div className='admin-tabl '>
          <div className='table-responsive '>
            <table class="table table-bordered">
              <thead>
                <tr className='admin-m_ain'>
                  <th>Sr. no.</th>
                  <th>Report</th>
                  <th>Password</th>
                  <th>Assigned</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Report 1 (EC)
                  </td>
                  <td>9855</td>
                  <td>
                    <button className="My-View" data-bs-toggle="modal" data-bs-target="#myreport-11">View</button>
                  </td>
                  <td>
                    <button className="My-View" data-bs-toggle="modal" data-bs-target="#edit-report">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='admin-under_filters'>
            <div className='admin-under_head'>
              <p className='admin-items1 mb-0'>
                Items per page
              </p>
              <div className="mb-0">
                <select name="cars" id="feald40" className="form-select">

                  <option value="volvo" disabled selected>Select one</option>
                  <option value="saab"> 1 </option>
                  <option value="mercedes">2</option>
                  <option value="audi">3</option>
                </select>
              </div>
              {/* <CreditDropdown options={options} placeholder="Select an option" /> */}
            </div>
            <div className='under_pagination'>
              <nav aria-label="Page navigation example">
                <ul className="pagination mb-0">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item"><a className="page-link active" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

        </div>
      </div>
      <div class="modal fade" id="myreport-11">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title">Report 1 (EC)</h3>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div className='container'>
                <div className='row'>
                  <div className='col-lg-6'>
                    <div className='report_in'>
                      <div className='report_icon-one'>
                        <div class="report-my_icon"><i class="ri-todo-line"></i></div>
                      </div>
                      <div className='report_in-desc'>
                        <h5>Mr Manish Kumar</h5>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className='report_in'>
                      <div className='report_icon-one'>
                        <div class="report-my_icon"><i class="ri-todo-line"></i></div>
                      </div>
                      <div className='report_in-desc'>
                        <h5>Mr Manish Kumar</h5>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className='report_in'>
                      <div className='report_icon-one'>
                        <div class="report-my_icon"><i class="ri-todo-line"></i></div>
                      </div>
                      <div className='report_in-desc'>
                        <h5>Mr Manish Kumar</h5>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className='report_in'>
                      <div className='report_icon-one'>
                        <div class="report-my_icon"><i class="ri-todo-line"></i></div>
                      </div>
                      <div className='report_in-desc'>
                        <h5>Mr Manish Kumar</h5>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className='report_in'>
                      <div className='report_icon-one'>
                        <div class="report-my_icon"><i class="ri-todo-line"></i></div>
                      </div>
                      <div className='report_in-desc'>
                        <h5>Mr Manish Kumar</h5>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className='report_in'>
                      <div className='report_icon-one'>
                        <div class="report-my_icon"><i class="ri-todo-line"></i></div>
                      </div>
                      <div className='report_in-desc'>
                        <h5>Mr Manish Kumar</h5>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className='report_in'>
                      <div className='report_icon-one'>
                        <div class="report-my_icon"><i class="ri-todo-line"></i></div>
                      </div>
                      <div className='report_in-desc'>
                        <h5>Mr Manish Kumar</h5>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="edit-report">
        <div class="modal-dialog modal-md">
          <div class="modal-content">
                <form action="#" method='POST'>
            <div class="modal-header">
              <h4 class="modal-title">Edit 	Report 1 (EC)</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div className='container'>
                  <div className="mb-3">
                    <label for="Password" className="form-label profile-user_label">Password</label>
                    <input type="text" className="form-control" id="Password" aria-describedby="emailHelp" placeholder="Enter Password" />
                  </div>
                  <div>
                    <div class="mb-3">
                      <label for="exampleInputPassword1" className="form-label profile-user_label">User List</label>
                      <MultiSelect
                        options={options}
                        value={selectedOptions}
                        onChange={handleChange}
                      />
                    </div>

                  </div>
              </div>
            </div>
            <div class="modal-footer">
                  <button type="submit" className="profile-submit_bot1">Save</button>
              {/* <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button> */}
            </div>
                </form>

          </div>
        </div>
      </div>
    </>
  );
}

export default Component;
