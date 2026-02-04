import ProgramCard from '../components/ProgramCard';
import Input from '../components/Inputs/Inputs';
import Menubar from '../components/Menubar';
import Filter from '../components/Filter';
import ButtonGroup from '../components/ButtonGroup'
import CustomButton from '../components/CustomButton'

const ProgramList = () => {
    const programs = [
        {
            id: 4,
            title: "Diploma in Software Engineering",
            desc: "A structured diploma program covering software development principles, algorithms, object-oriented programming, and version control systems. A structured diploma program covering software development principles, algorithms, object-oriented programming, and version control systems. A structured diploma program covering software development principles, algorithms, object-oriented programming, and version control systems. A structured diploma program covering software development principles, algorithms, object-oriented programming, and version control systems. A structured diploma program covering software development principles, algorithms, object-oriented programming, and version control systems."
        },
        {
            id: 5,
            title: "Diploma in Computer Science",
            desc: "A broad-based diploma focusing on programming fundamentals, data structures, operating systems, and computer networks."
        },
        {
            id: 6,
            title: "Diploma in Cybersecurity",
            desc: "A professional diploma program designed to teach network security, ethical hacking, risk management, and cyber defense strategies."
        },
        {
            id: 7,
            title: "Diploma in Mobile App Development",
            desc: "An industry-oriented diploma covering Android and iOS app development, UI design, APIs, and app deployment."
        },
        {
            id: 8,
            title: "Diploma in Artificial Intelligence",
            desc: "A specialized diploma program focusing on AI concepts, machine learning algorithms, neural networks, and real-world AI applications."
        },
        {
            id: 9,
            title: "Diploma in Cloud Computing",
            desc: "A comprehensive diploma covering cloud platforms, virtualization, DevOps basics, and scalable cloud infrastructure design."
        },
        {
            id: 10,
            title: "Diploma in Digital Marketing",
            desc: "A career-focused diploma program teaching SEO, social media marketing, content strategy, and online advertising techniques."
        },
        {
            id: 11,
            title: "Diploma in Information Technology",
            desc: "A practical diploma program covering IT fundamentals, system administration, hardware, software, and networking essentials."
        },
        {
            id: 12,
            title: "Diploma in Business Analytics",
            desc: "An analytical diploma program focused on data-driven decision-making, business intelligence tools, and statistical analysis."
        },
        {
            id: 13,
            title: "Diploma in Game Development",
            desc: "A creative diploma program covering game design principles, game engines, programming, and interactive media development."
        }
    ];


    // 3. The requested Render Function
    const RenderActionButtonGroup = (onAction) => {
        const plusIcon = <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M12 4v16m8-8H4" /></svg>;
        const downloadIcon = <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
     
        const actions = [
            { id: 'create', text: "Create", variant: "primary", icon: plusIcon },
            { id: 'export', text: "Export", variant: "secondary", icon: downloadIcon },
        ];

        return (
            <ButtonGroup>
                {actions.map((action, index) => (
                    <CustomButton
                        key={action.id}
                        variant={action.variant}
                        text={action.text}
                        icon={action.icon}
                        onClick={() => onAction(action.id)}
                        isFirst={index === 0}
                        isLast={index === actions.length - 1}
                    />
                ))}
            </ButtonGroup>
        );
    };


    const RenderFilters = () => {
        const filterConfig = [
            {
                key: "level",
                placeholder: "Level",
                options: [
                    { id: "diploma", label: "Diploma" },
                    { id: "bachelor", label: "Bachelor" },
                    { id: "master", label: "Master" },
                    { id: "phd", label: "PhD" },
                ],
            },
            {
                key: "mode",
                placeholder: "Mode",
                options: [
                    { id: "fulltime", label: "Full-time" },
                    { id: "parttime", label: "Part-time" },
                    { id: "online", label: "Online" },
                ],
            },
            {
                key: "location",
                placeholder: "Location",
                options: [
                    { id: "kl", label: "Kuala Lumpur" },
                    { id: "penang", label: "Penang" },
                    { id: "johor", label: "Johor" },
                    { id: "online", label: "Online" },
                ],
            },
        ];

       
        return (
            <div className = "filter-section">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom:'15px'}}>
                    {filterConfig.map((f) => (
                        <>
                            <Filter
                                key={f.key}
                                placeholder={f.placeholder}
                                options={f.options}
                            />
                        </>
                    ))}
                </div>
            </div>
           
        )
    }

    const handleAction = (actionId) => {
        switch (actionId) {
            case "create":
                console.log("Creating new program...");
                break;
            case "export":
                console.log("Exporting program list...");
                break;
            case "edit":
                console.log("Editing program...");
                break;
            case "delete":
                console.log("Deleting program...");
                break;
            default:
                console.log("Unknown action");
        }
    };

    return (
        <>
        <Menubar />
            <div style={{ marginTop: '20px', maxWidth: 1200, margin: "auto", padding: "40px" }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <RenderActionButtonGroup onAction={handleAction} />
                </div>

                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', marginBottom:'10px'}}>
                    {/* Search */}
                    <div style={{ position: 'relative' }}>
                        <Input
                            label={"Search & Manage Programs"}
                            placeholder="Search programs..."
                            style={{ width: '100%', fontSize: '16px', paddingLeft: '40px' }}
                        />
                    </div>

                    {/* Filter */}
                    <RenderFilters />

                    <div className= "card-section" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '24px',
                    }}>
                        {programs.map(program => (
                            <ProgramCard
                                key={program.id}
                                title={program.title}
                                description={program.desc}
                                onViewDetails={() => console.log('Navigating...')}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
export default ProgramList;