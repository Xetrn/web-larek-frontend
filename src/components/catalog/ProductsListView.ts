import { TViewNested, AbstractView } from '../base/AbstractView';

type TProductsRenderArgs<T extends object> = {
	items: TViewNested<T>[];
};

class ProductsListView extends AbstractView {
	set items(value: TViewNested[]) {
		this._element.replaceChildren(
			...value.map(({ view, renderArgs }) =>
				view instanceof AbstractView ? view.render(renderArgs) : view
			)
		);
	}

	render<RenderArgs extends object = object>(args: TProductsRenderArgs<RenderArgs>) {
		super.render(args);

		return this._element;
	}
}

export { ProductsListView, TProductsRenderArgs };
