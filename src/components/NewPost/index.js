import React, { Component } from "react";
import { connect } from "react-redux";
import { Label } from "semantic-ui-react";
import { Form, Dropdown } from "formsy-semantic-ui-react";
import { handleAddPost } from "../../store/actions/post";
import { withRouter } from "react-router-dom";

import { handdleReceiveCategories } from "../../store/actions/categories";

class NewPost extends Component {
  componentDidMount() {
    this.props.dispatch(handdleReceiveCategories());
  }

  onValidSubmit = FormData => {
    const newPost = {
      title: FormData.title,
      author: FormData.author,
      category: FormData.category,
      body: FormData.body
    };

    this.props.dispatch(handleAddPost(newPost));

    this.props.history.push("/");
  };

  render() {
    const { categories } = this.props;
    const options = categories.map(c => ({
      key: c.path,
      text: c.name,
      value: c.path
    }));

    return (
      <Form ref={ref => (this.form = ref)} onValidSubmit={this.onValidSubmit}>
        <Form.Field>
          <Form.Input
            required
            name="title"
            label="Título"
            placeholder="Seu título"
            validations="isExisty"
            errorLabel={<Label color="red" pointing />}
            validationErrors={{
              isDefaultRequiredValue: "O título é obrigatório."
            }}
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            required
            name="author"
            label="Autor"
            placeholder="Nome do autor"
            validations="isExisty"
            errorLabel={<Label color="red" pointing />}
            validationErrors={{
              isDefaultRequiredValue: "O nome do autor é obrigatório."
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Categoria</label>
          <Dropdown
            name="category"
            placeholder="Categoria"
            search
            selection
            defaultValue="react"
            required
            validations="isExisty"
            validationErrors={{
              isDefaultRequiredValue: "Você tem que selecionar uma categoria."
            }}
            errorLabel={<Label color="red" pointing />}
            options={options}
          />
        </Form.Field>

        <Form.TextArea
          required
          name="body"
          label="Conteúdo"
          validations="isExisty"
          placeholder="Escreva aqui seus conteúdo..."
          errorLabel={<Label color="red" pointing />}
          validationErrors={{
            isDefaultRequiredValue:
              "O campo não pode ser vazio, escreva seu comentário."
          }}
        />

        <Form.Button content="Salvar" color="green" />
      </Form>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  categories: categories.list
});

export default withRouter(connect(mapStateToProps)(NewPost));
