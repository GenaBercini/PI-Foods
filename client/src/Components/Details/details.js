import React from 'react';
import { connect } from 'react-redux';
import { getRecipeById, deleteRecipe } from '../../Reducer/actions';
import Loading from '../Loading/loading';
import Error from '../Error/error'
import './details.css';

export class DetailRecipe extends React.Component {
    constructor(props) {
        super(props);
        // this.handleDelete = this.handleDelete.bind(this)
        this.handleBack = this.handleBack.bind(this)
    }

    componentDidMount() {
        let id = this.props.id
        this.props.getRecipeById(id)
    }

    // handleDelete(e) {
    //     e.preventDefault();
    //     this.props.deleteRecipe(e.target.value);
    //     alert('Successfully deleted recipe')
    //     this.props.navigate('/home')
    // }
    handleBack(e) {
        e.preventDefault();
        this.props.navigate('/home')
    }
    render() {
        let diets;
        let instructions;
        let founded;
        if (this.props.details) {
            diets = this.props.details.createDB ? this.props.details.diets.map(e => e.name) : this.props.details.diets;
            instructions = this.props.details.analyzedInstructions && this.props.details.analyzedInstructions.length > 0 ?
                this.props.details.analyzedInstructions[0].steps.map(e => e.step) : this.props.details.steps;
            founded = this.props.details.name ? false : true;
        }
        return (
            <div>
                {
                    this.props.loading ? (<Loading />)
                        : founded ? (
                            <div className='details'>
                                <div className='details-card'>
                                    <img className='detals-image' src={this.props.details.image} alt={this.props.details.title} />
                                    <button className='details-btn' onClick={this.handleBack}>X</button>
                                    <div className='details-text'>
                                        <div className='details-div'>
                                            <h1 className='text-title title'>{this.props.details.title}</h1>
                                        </div>
                                        <div className='details-div'>
                                            <p><b className='text-title'>Diets</b></p>
                                            <div className='details-diets'>{diets?.map(e => `${e}, `)}</div>
                                        </div>
                                        <div className='details-div-num'>
                                            <p className='health'><b className='text-title'>Health Score: </b>{this.props.details.healthScore}</p>
                                        </div>
                                        <div className='details-div'>
                                            <p className='score'><b className='text-title'>Food Score: </b>{this.props.details.spoonacularScore}</p>
                                        </div>
                                        <div className='details-div'>
                                            <p><b className='text-title'>Summary</b></p>
                                            <div className='summary' dangerouslySetInnerHTML={{ __html: this.props.details.summary }}></div>
                                        </div>
                                        <div className='details-div'>
                                            <p><b className='text-title'>Instructions</b></p>
                                            <div className='steps'>{instructions ? instructions : 'Probably that does not has instructions'}</div>
                                        </div>
                                    </div>
                                    {/* {this.props.details.createDB && <button className='details-delete' value={this.props.id} onClick={this.handleDelete}>DELETE</button>} */}
                                </div>
                            </div>
                        )
                            : (
                                <Error message='Details Not Exist For That' />
                            )

                }
            </div>
        )
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        getRecipeById: (id) => {
            dispatch(getRecipeById(id));
        },
        deleteRecipe: (id) => {
            dispatch(deleteRecipe(id));
        }
    }
}

export function mapStateToProps(state) {
    return {
        details: state.recipesDetail,
        loading: state.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailRecipe)