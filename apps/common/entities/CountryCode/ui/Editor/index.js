import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, ControlLabel, FormGroup, Row } from 'react-bootstrap';

import Validation from '../../../../ui/components/Validation';

class CountryCodeEditor extends React.Component {
  handleSubmit = (form) => {
    const { doc, updateDoc } = this.props;

    const newDoc = {
      name: form.name.value,
      officialName: form.officialName.value,
      sovereignty: form.sovereignty.value,
      alpha2Code: form.alpha2Code.value,
      alpha3Code: form.alpha3Code.value,
      numericCode: form.numericCode.value,
      ccTLD: form.ccTLD.value,
      description: form.description.value,
    };

    if (doc) newDoc._id = doc._id;

    updateDoc(
      {
        variables: {
          inputCountryCode: {
            ...newDoc,
          },
        },
      },
      {
        detailCountryCode: {
          ...doc,
          ...newDoc,
        },
      },
    );
  };

  handleRemoveDoc = () => {
    // eslint-disable-next-line react/destructuring-assignment
    const { doc, removeDoc } = this.props;
    const { _id, name } = doc;
    if (confirm(`Document [ ${name || _id} ] will permanently DELETED!!! ARE YOU SURE???`)) {
      removeDoc({
        variables: {
          _id,
        },
      });
    }
  };

  render() {
    const { doc, disabled } = this.props;

    return (
      <React.Fragment>
        <Validation
          rules={{
            name: {
              required: true,
            },
            officialName: {
              required: true,
            },
            sovereignty: {
              required: true,
            },
            alpha2Code: {
              required: true,
            },
            alpha3Code: {
              required: true,
            },
            numericCode: {
              required: true,
            },
            ccTLD: {
              required: true,
            },
          }}
          messages={{
            name: {
              required: 'Harap mengisi Nama CountryCode',
            },
            officialName: {
              required: 'Harap mengisi Nama resmi',
            },
            sovereignty: {
              required: 'Harap mengisi sovereignty',
            },
            alpha2Code: {
              required: 'Harap mengisi alpha2Code',
            },
            alpha3Code: {
              required: 'Harap mengisi alpha3Code',
            },
            numericCode: {
              required: 'Harap mengisi numericCode',
            },
            ccTLD: {
              required: 'Harap mengisi ccTLD',
            },
          }}
          submitHandler={(form) => this.handleSubmit(form)}
        >
          <form ref={(form) => (this.form = form)} onSubmit={(event) => event.preventDefault()}>
            <Row>
              <Col xs={12} md={6}>
                <Row>
                  <Col xs={12}>
                    <FormGroup>
                      <ControlLabel>Nama</ControlLabel>
                      <input
                        type="text"
                        name="name"
                        autoComplete="off"
                        className="form-control"
                        defaultValue={doc && doc.name}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12}>
                    <FormGroup>
                      <ControlLabel>Official Name</ControlLabel>
                      <input
                        type="text"
                        name="officialName"
                        autoComplete="off"
                        className="form-control"
                        defaultValue={doc && doc.officialName}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12}>
                    <FormGroup>
                      <ControlLabel>Sovereignty</ControlLabel>
                      <input
                        type="text"
                        name="sovereignty"
                        autoComplete="off"
                        className="form-control"
                        defaultValue={doc && doc.sovereignty}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12}>
                    <FormGroup>
                      <ControlLabel>alpha2Code</ControlLabel>
                      <input
                        type="text"
                        name="alpha2Code"
                        autoComplete="off"
                        className="form-control"
                        defaultValue={doc && doc.alpha2Code}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12}>
                    <FormGroup>
                      <ControlLabel>alpha3Code</ControlLabel>
                      <input
                        type="text"
                        name="alpha3Code"
                        autoComplete="off"
                        className="form-control"
                        defaultValue={doc && doc.alpha3Code}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12}>
                    <FormGroup>
                      <ControlLabel>numericCode</ControlLabel>
                      <input
                        type="text"
                        name="numericCode"
                        autoComplete="off"
                        className="form-control"
                        defaultValue={doc && doc.numericCode}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12}>
                    <FormGroup>
                      <ControlLabel>ccTLD</ControlLabel>
                      <input
                        type="text"
                        name="ccTLD"
                        autoComplete="off"
                        className="form-control"
                        defaultValue={doc && doc.ccTLD}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12}>
                    <FormGroup>
                      <ControlLabel>Description</ControlLabel>
                      <textarea
                        rows={3}
                        name="description"
                        className="form-control"
                        defaultValue={doc && doc.description}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                {!disabled ? (
                  <Button type="submit" bsStyle="success">
                    {doc ? 'Save Changes' : 'Create new CountryCode'}
                  </Button>
                ) : (
                  <div />
                )}
                {!disabled && doc && (
                  <Button bsStyle="danger" className="pull-right" onClick={this.handleRemoveDoc}>
                    Delete
                  </Button>
                )}
                <hr />
              </Col>
              {doc.status !== 'Draft' && (
                <Col xs={12} md={6}>
                  <Row>
                    <Col xs={6} md={6}>
                      <FormGroup>
                        <ControlLabel>Type</ControlLabel>
                        <input
                          type="text"
                          name="type"
                          className="form-control"
                          defaultValue={doc && doc.type}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={6} md={6}>
                      <FormGroup>
                        <ControlLabel>Status</ControlLabel>
                        <input
                          type="text"
                          name="status"
                          className="form-control"
                          defaultValue={doc && doc.status}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              )}
            </Row>
          </form>
        </Validation>
      </React.Fragment>
    );
  }
}

CountryCodeEditor.propTypes = {
  doc: PropTypes.object.isRequired,
  updateDoc: PropTypes.func.isRequired,
  removeDoc: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default CountryCodeEditor;
