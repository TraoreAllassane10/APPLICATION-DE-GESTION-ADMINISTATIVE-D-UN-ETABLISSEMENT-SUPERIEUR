import { ShowTabs, Tab } from '../../types/inscription.types';

interface InscriptionShowTabs {
    Tabs: ShowTabs[];
    activeTab: Tab;
    onActiveTab: (value: React.SetStateAction<Tab>) => void;
}

const InscriptionShowTabs = ({
    Tabs,
    activeTab,
    onActiveTab,
}: InscriptionShowTabs) => {
    return (
        <div className="flex gap-0 border-b">
            {Tabs.map(({ id, label, icon: Icon }) => (
                <button
                    key={id}
                    onClick={() => onActiveTab(id)}
                    className={`-mb-px inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                        activeTab === id
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'
                    } `}
                >
                    <Icon className="h-4 w-4" />
                    {label}
                </button>
            ))}
        </div>
    );
};

export default InscriptionShowTabs;
